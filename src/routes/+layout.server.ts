import { getUserInformation } from '$lib/helper';
import type { UserInformation } from '$lib/types';

export async function load({ cookies }): Promise<UserInformation> {
	return getUserInformation(cookies);
}
