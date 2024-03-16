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
const refreshCookieName = 'refreshToken';
const secretAuth = '81a33490ec51c2e2d7a72ff094c4a062fc2a27648032c4658edd0ccb226e0da6'; // TODO get via env variable
const secretRefresh = '37878bcfb282312d4a08d96247f51624732000179342057d36c8547513292410'; // TODO get via env variable

function setToken(
	user: User,
	cookies: Cookies,
	secret: string,
	cookieName: string,
	duration: string,
	maxAge: number
): void {
	const authToken = jwt.sign(user, secret, { expiresIn: duration });
	cookies.set(cookieName, authToken, {
		path: '/',
		secure: !dev,
		httpOnly: true,
		maxAge: maxAge
	});
}

export function setAuthToken(user: User, cookies: Cookies): void {
	setToken(user, cookies, secretAuth, authCookieName, '10m', 60 * 10);
}

export function setRefreshToken(user: User, cookies: Cookies): void {
	setToken(user, cookies, secretRefresh, refreshCookieName, '120d', 60 * 60 * 24 * 120);
}

function verifyToken(cookies: Cookies, secret: string, cookieName: string): User | JwtVerifyResult {
	const authToken: string | undefined = cookies.get(cookieName);
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

export function verifyAuthToken(cookies: Cookies): User | JwtVerifyResult {
	return verifyToken(cookies, secretAuth, authCookieName);
}

export function verifyRefreshToken(cookies: Cookies): User | JwtVerifyResult {
	return verifyToken(cookies, secretRefresh, refreshCookieName);
}

export function deleteAuthToken(cookies: Cookies) {
	cookies.delete(authCookieName, { path: '/' });
}

export function deleteRefreshToken(cookies: Cookies) {
	cookies.delete(refreshCookieName, { path: '/' });
}
