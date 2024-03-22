import type { UserInformation } from '$lib/types';
import { loadTranslations } from '$lib/translations';

export async function load({ locals, url }): Promise<UserInformation> {
	const { pathname } = url;
	const initLocale = 'en'; // TODO get from cookie, user session, ...

	const ui: UserInformation = { user: locals.user };

	const translations = loadTranslations(initLocale, pathname);

	if (!translations) {
		console.log('ERROR while loading translations');
		return ui;
	} else {
		return translations.then(() => {
			return ui;
		});
	}
}
