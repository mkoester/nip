import { deleteAuthToken, verifyAuthToken } from '$lib/helper';
import { JwtVerifyResult, type User } from '$lib/types';

export async function handle({ event, resolve }) {
	const verified: User | JwtVerifyResult = verifyAuthToken(event.cookies);
	event.locals.user = undefined;
	switch (verified) {
		case JwtVerifyResult.no_cookie: {
			break;
		}
		case JwtVerifyResult.token_expired: {
			deleteAuthToken(event.cookies);
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
				event.locals.user = verified;
			} else {
				console.log(`DEBUG unhandled case in handle function\n${JSON.stringify(verified)}`);
				console.log(typeof verified);
			}
			break;
		}
	}

	return resolve(event);
}
