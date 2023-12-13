import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Static Adapter Info: https://kit.svelte.dev/docs/adapter-static
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		// By default, the SvelteKit static adapter will generate the website in the
		// root of the  build  folder. However, GitHub Pages will serve the website from a subfolder.
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/math-toolbox' :  ''
		},

		// https://kit.svelte.dev/docs/configuration#alias
		alias: {
			'$src/*': 'src/*',
			'$icons/*': 'src/icons/*'
		}
	}
};

export default config;
