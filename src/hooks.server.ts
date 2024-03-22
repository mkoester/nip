import {
	deleteAuthToken,
	deleteRefreshToken,
	setAuthToken,
	verifyAuthToken,
	verifyRefreshToken
} from '$lib/helper';
import { JwtType, JwtVerifyResult, type User } from '$lib/types';
import { config, loadTranslations } from '$lib/translations';
import type { RequestEvent } from '@sveltejs/kit';

// I followed https://www.youtube.com/watch?v=1mov2Piv97k
// this feels a bit off (sending both tokens all the time)
// why not use just one and refresh it with each request? (since I am not doing any I/O etc)
function handleJwt(
	jwtType: JwtType,
	verified: User | JwtVerifyResult,
	event: RequestEvent<Partial<Record<string, string>>, string | null>
) {
	event.locals.user = undefined;
	switch (verified) {
		case JwtVerifyResult.no_cookie: {
			if (jwtType == JwtType.auth) {
				const verified: User | JwtVerifyResult = verifyRefreshToken(event.cookies);
				handleJwt(JwtType.refresh, verified, event); // the auth token is not present, but let's try to renew via refresh token
			}
			break;
		}
		case JwtVerifyResult.token_expired: {
			switch (jwtType) {
				case JwtType.auth: {
					deleteAuthToken(event.cookies);
					const verified: User | JwtVerifyResult = verifyRefreshToken(event.cookies);
					handleJwt(JwtType.refresh, verified, event); // the auth token is expired, but let's try to renew via refresh token
					break;
				}
				case JwtType.refresh: {
					deleteRefreshToken(event.cookies); // the refresh token is expired, too
					break;
				}
			}
			break;
		}
		case JwtVerifyResult.unknown_error: {
			break;
		}
		case JwtVerifyResult.unknown_payload: {
			break;
		}
		default: {
			if (typeof verified === 'object') {
				switch (jwtType) {
					case JwtType.auth: {
						event.locals.user = verified;
						break;
					}
					case JwtType.refresh: {
						setAuthToken(verified, event.cookies); // assign a new auth token
						event.locals.user = verified; // TODO: when to assign a new refresh token?
						break;
					}
				}
			} else {
				console.log(
					`DEBUG unhandled case in handle function for jwtType ${jwtType}\n${JSON.stringify(verified)}`
				);
				console.log(typeof verified);
			}
			break;
		}
	}
}

function withTranslations(event: RequestEvent<Partial<Record<string, string>>, string | null>) {
	const { pathname } = event.url;
	const langAccept = event.request.headers.get('accept-language');

	let lang: string;
	if (!langAccept) {
		console.log('DEBUG falling back to English, no accept-language HEADER');
		lang = 'en';
	} else {
		const languages = langAccept.split(',').map((l) => l.trim().slice(0, 2));

		const acceptedLang: string | undefined = languages.find((l) => {
			const langId: string = l;
			return Object.keys(config.translations).indexOf(langId) >= 0;
		});

		if (!acceptedLang) {
			console.log(
				'DEBUG falling back to English, accept-language HEADER is not supported:\n' + languages
			);
			lang = 'en';
		} else {
			lang = acceptedLang;
		}
	}

	const translations = loadTranslations(lang, pathname);

	if (!translations) {
		console.log('ERROR while loading translations');
		return Promise.resolve(event);
	} else {
		return translations.then(() => {
			return event;
		});
	}
}

export async function handle({ event, resolve }) {
	const verified: User | JwtVerifyResult = verifyAuthToken(event.cookies);
	handleJwt(JwtType.auth, verified, event);

	return withTranslations(event).then(resolve);
}
