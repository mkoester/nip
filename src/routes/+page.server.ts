import { setLangToken } from '$lib/helper';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	language_change: async ({ request, cookies }) => {
		return request.formData().then((formData) => {
			const lang: FormDataEntryValue | null = formData.get('lang');
			const current_url: string = formData.get('curent_url')?.toString() ?? '/';
			if (!lang) {
				return fail(400, { lang: true, missing: true });
			}
			setLangToken(lang.toString(), cookies);
			redirect(302, current_url);
		});
	}
} satisfies Actions;
