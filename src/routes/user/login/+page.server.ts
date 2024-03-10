import { get_users } from '$lib/db/sqlite';
import type { User } from '$lib/types';

export async function load(): Promise<{ users: User[] }> {
	return get_users().then((users) => {
		return { users };
	});
}
