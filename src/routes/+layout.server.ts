import type { UserInformation } from '$lib/types';

export async function load({ locals }): Promise<UserInformation & { locale: string }> {
	return { user: locals.user, locale: locals.locale };
}
