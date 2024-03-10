import type { UserInformation } from '$lib/types';

export async function load({ cookies }): Promise<UserInformation> {
	const username = cookies.get('user_name');
	const user_id = cookies.get('user_id');

	if (username && user_id) {
		return {
			user: {
				username,
				id: Number(user_id)
			}
		} satisfies UserInformation;
	} else {
		return { user: undefined } satisfies UserInformation;
	}
}
