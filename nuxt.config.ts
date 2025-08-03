import tailwindcss from "@tailwindcss/vite";

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
  ssr: process.env.TAURI_USED !== "true",
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "nuxt-vue3-google-signin",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/css/main.css"],
  nitro: {
    storage: {
      todos: {
        base: "todos",
        driver: "upstash",
        url: process.env.UPSTASH_URL,
        token: process.env.UPSTASH_TOKEN,
      },
      tags: {
        base: "tags",
        driver: "upstash",
        url: process.env.UPSTASH_URL,
        token: process.env.UPSTASH_TOKEN,
      },
      categories: {
        base: "categories",
        driver: "upstash",
        url: process.env.UPSTASH_URL,
        token: process.env.UPSTASH_TOKEN,
      },
    },
    devStorage: {
      todos: {
        driver: "fs",
        base: ".nuxt/storage/todos",
      },
      tags: {
        driver: "fs",
        base: ".nuxt/storage/tags",
      },
      categories: {
        driver: "fs",
        base: ".nuxt/storage/categories",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      strictPort: true,
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL ?? "",
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleRedirectUrl: process.env.GOOGLE_REDIRECT_URL,
      jwtTTL: process.env.JWT_TTL_SECONDS,
    },
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    libsqlUrl: process.env.LIBSQL_URL,
    libsqlAuth: process.env.LIBSQL_AUTH,
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    strategy: "prefix",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "de", name: "German", file: "de.json" },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
});
