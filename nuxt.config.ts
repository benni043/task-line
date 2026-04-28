// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	future: {
		compatibilityVersion: 4,
	},
	app: {
		head: {
			title: "TaskLine",
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png",
				},
			],
		},
	},
	ssr: true,
	compatibilityDate: "2026-03-02",
	devtools: { enabled: true },
	modules: [
		"@nuxt/icon",
		"@nuxt/test-utils/module",
		"@nuxtjs/device",
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/tailwindcss",
	],
	css: ["~/assets/css/main.css"],
	vite: {
		clearScreen: false,
		envPrefix: ["VITE_"],
		server: {
			strictPort: true,
		},
	},
	runtimeConfig: {
		public: {
			baseURL: process.env.BASE_URL ?? "",
			subscriptionsPublicKey:
				process.env.NUXT_PUBLIC_SUBSCRIPTIONS_PUBLIC_KEY ?? "",
		},
		upstash: {
			url: process.env.UPSTASH_URL,
			token: process.env.UPSTASH_TOKEN,
		},
		NUXT_ENV: process.env.NUXT_ENV,
	},
	i18n: {
		strategy: "prefix_and_default",
		locales: [
			{ code: "en", name: "English", file: "en.json" },
			{ code: "de", name: "German", file: "de.json" },
		],
		defaultLocale: "en",
	},
	nitro: {
		experimental: {
			tasks: true,
		},
		scheduledTasks: {
			"* * * * *": ["notify:push"],
		},
	},
});
