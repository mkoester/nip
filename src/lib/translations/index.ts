import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';
import lang from './lang.json';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
	log: {
		level: dev ? 'warn' : 'error'
	},
	translations: {
		en: { lang },
		de: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'header',
			loader: async () => (await import('./en/header.json')).default
		},
		{
			locale: 'de',
			key: 'header',
			loader: async () => (await import('./de/header.json')).default
		}
	],
	fallbackLocale: defaultLocale
};

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
