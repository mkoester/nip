import { JwtVerifyResult, type User, type UserInformation } from '$lib/types';
import type { Cookies } from '@sveltejs/kit';
import { dev } from '$app/environment';
import jwt from 'jsonwebtoken';

export function getUserInformation(cookies: Cookies): UserInformation {
	const userString = cookies.get('user');

	if (userString) {
		const user: User = JSON.parse(userString);
		return {
			user: {
				username: user.username,
				id: Number(user.id)
			}
		} satisfies UserInformation;
	} else {
		return { user: undefined } satisfies UserInformation;
	}
}

const authCookieName = 'authToken';
const secret = '81a33490ec51c2e2d7a72ff094c4a062fc2a27648032c4658edd0ccb226e0da6'; // TODO get via env variable

export function setAuthToken(user: User, cookies: Cookies) {
	const authToken = jwt.sign(user, secret, { expiresIn: '10s' });
	cookies.set(authCookieName, authToken, {
		path: '/',
		secure: !dev,
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 30
	});
}

export function verifyAuthToken(cookies: Cookies): User | JwtVerifyResult {
	const authToken: string | undefined = cookies.get(authCookieName);
	if (!authToken) return JwtVerifyResult.no_cookie;
	try {
		const payload = jwt.verify(authToken, secret);
		if (typeof payload === 'object') {
			return {
				id: payload.id,
				username: payload.username
			} satisfies User;
		} else {
			console.log(
				`DEBUG unknown payload during verifyAuthToken for user JWT: ${authToken}\n${payload}`
			);
			return JwtVerifyResult.unknown_payload;
		}
	} catch (e) {
		if (e instanceof jwt.TokenExpiredError) {
			return JwtVerifyResult.token_expired;
		} else {
			console.log(`ERROR during verifyAuthToken for user JWT: ${authToken}\n${e}`);
			return JwtVerifyResult.unknown_error;
		}
	}
}

export function deleteAuthToken(cookies: Cookies) {
	cookies.delete(authCookieName, { path: '/' });
}
