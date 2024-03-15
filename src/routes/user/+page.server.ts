import type { User } from '$lib/types';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { deleteAuthToken, setAuthToken } from '$lib/helper';

export const actions = {
	login: async ({ request, cookies }) => {
		return request.formData().then((formData) => {
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
			setAuthToken(user, cookies);
			throw redirect(302, '/user/games');
		});
	},
	logout: async ({ cookies }) => {
		deleteAuthToken(cookies);
		throw redirect(302, '/');
	}
} satisfies Actions;
