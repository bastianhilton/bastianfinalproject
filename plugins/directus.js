import { createDirectus, rest, readItem, readItems, readSingleton } from '@directus/sdk';
import 'dotenv'

const directus = createDirectus('http://89.116.38.24:8011').with(rest());

export default defineNuxtPlugin(() => {
	return {
		provide: { directus, readItem, readItems, readSingleton },
	};
});