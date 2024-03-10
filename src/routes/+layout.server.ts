import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const user_name = cookies.get('user_name');
	const user_id = cookies.get('user_id');

	if (user_name && user_id) {
		// TODO type properly
		return {
			user: {
				user_name,
				user_id
			}
		};
	} else {
		return { user: undefined };
	}
}) satisfies LayoutServerLoad;
