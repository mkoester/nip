import type { Actions, RequestEvent } from './$types';

export const actions = {
	logout: async (event: RequestEvent) => {
		event.cookies.delete('user_name', { path: '/' });
		event.cookies.delete('user_id', { path: '/' });
		//return { logged_out: true };
	}
} satisfies Actions;
