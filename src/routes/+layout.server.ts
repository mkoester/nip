import type { User, UserInformation } from '$lib/types';

export async function load({ cookies }): Promise<UserInformation> {
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
