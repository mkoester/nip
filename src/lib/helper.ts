import type { User, UserInformation } from '$lib/types';
import type { Cookies } from '@sveltejs/kit';

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
