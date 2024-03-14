import { getUserInformation } from '$lib/helper';
import type { UserInformation } from '$lib/types';

export async function handle({ event, resolve }) {
	const userInformation: UserInformation = getUserInformation(event.cookies);
	event.locals.user = userInformation.user;

	return resolve(event);
}
