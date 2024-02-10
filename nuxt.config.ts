// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	runtimeConfig: {
		clientId: "",
	},
	app: {
		head: {
			charset: "utf-8",
			htmlAttrs: {
				lang: "ja",
			},
			title: "雨降りそう？",
			link: [
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/favicon-16x16.png",
				},
				{
					rel: "manifest",
					href: "/site.webmanifest",
				},
			],
		},
	},
	modules: [
		"@pinia/nuxt",
		"@hebilicious/vue-query-nuxt",
		"@nuxtjs/tailwindcss",
		[
			"@nuxtjs/google-fonts",
			{
				families: {
					"Noto+Sans+JP": true,
				},
			},
		],
	],
});
