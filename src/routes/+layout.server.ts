import type { UserInformation } from '$lib/types';

export async function load({ locals }): Promise<UserInformation> {
	return { user: locals.user };
}
