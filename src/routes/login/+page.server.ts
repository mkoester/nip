import { get_users } from '$lib/db/sqlite';
import type { User } from '$lib/types';
import type { Actions, RequestEvent } from './$types';
import { fail } from '@sveltejs/kit';

export async function load(): Promise<{ users: User[] }> {
	return get_users().then((users) => {
		return { users };
	});
}

export const actions = {
	default: async (event: RequestEvent) => {
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
	}
} satisfies Actions;
