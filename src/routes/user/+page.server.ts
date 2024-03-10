import type { User } from '$lib/types';
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
			const user: User = {
				username: username?.toString(),
				id: Number(id?.toString())
			};
			event.cookies.set('user', JSON.stringify(user), { path: '/' });
		});
	},
	logout: async (event: RequestEvent) => {
		event.cookies.delete('user', { path: '/' });
	}
} satisfies Actions;
