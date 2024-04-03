import {
	deleteAuthToken,
	deleteRefreshToken,
	getLangToken,
	setAuthToken,
	verifyAuthToken,
	verifyRefreshToken
} from '$lib/helper';
import { JwtType, JwtVerifyResult, type User } from '$lib/types';
import { config, defaultLocale } from '$lib/translations';
import type { MaybePromise, RequestEvent, ResolveOptions } from '@sveltejs/kit';

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

function withTranslations(
	event: RequestEvent<Partial<Record<string, string>>, string | null>,
	resolve: (
		event: RequestEvent<Partial<Record<string, string>>, string | null>,
		opts?: ResolveOptions | undefined
	) => MaybePromise<Response>
): MaybePromise<Response> {
	const cookieLang = getLangToken(event.cookies);

	if (cookieLang) {
		event.locals.locale = cookieLang;
	} else {
		const langAccept = event.request.headers.get('accept-language');

		if (!langAccept) {
			console.log('DEBUG falling back to English, no accept-language HEADER');
			event.locals.locale = defaultLocale;
		} else {
			const languages = langAccept.split(',').map((l) => l.trim().slice(0, 2));

			const acceptedLang: string | undefined = languages.find((l) => {
				const langId: string = l;
				return Object.keys(config.translations ?? {}).indexOf(langId) >= 0;
			});

			if (!acceptedLang) {
				console.log(
					'DEBUG falling back to English, accept-language HEADER is not supported:\n' + languages
				);
				event.locals.locale = defaultLocale;
			} else {
				event.locals.locale = acceptedLang;
			}
		}
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			if (event.locals.locale != defaultLocale) {
				return html.replace('<html lang="en"', `<html lang="${event.locals.locale}"`);
			}
			return html;
		}
	});
}

export async function handle({ event, resolve }): Promise<Response> {
	const verified: User | JwtVerifyResult = verifyAuthToken(event.cookies);
	handleJwt(JwtType.auth, verified, event);

	return withTranslations(event, resolve);
}
