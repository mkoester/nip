import type { Actions, RequestEvent } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
	login: async (event: RequestEvent) => {
		return event.request.formData().then((formData) => {
			const username: FormDataEntryValue | null = formData.get('username');
			const id: FormDataEntryValue | null = formData.get('id');
			if (!username) {
				return fail(400, { username: true, missing: true });
			}
			if (!id) {
				return fail(400, { id: true, missing: true });
			}
			event.cookies.set('user_name', username?.toString(), { path: '/' });
			event.cookies.set('user_id', id?.toString(), { path: '/' });
			return { logged_in: true, user_name: username?.toString(), user_id: id?.toString() };
		});
	},
	logout: async (event: RequestEvent) => {
		event.cookies.delete('user_name', { path: '/' });
		event.cookies.delete('user_id', { path: '/' });
	}
} satisfies Actions;
