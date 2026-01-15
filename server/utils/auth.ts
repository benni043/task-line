import { DatabaseSync } from "node:sqlite";
import { betterAuth } from "better-auth";
import { apiKey } from "better-auth/plugins";

export const auth = betterAuth({
	database: new DatabaseSync("./.data/sqlite.db"),
	trustedOrigins: [...process.env.TRUSTED_ORIGINS!.split(",")],
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			prompt: "select_account",
		},
	},
	plugins: [
		apiKey({
			rateLimit: {
				enabled: false,
			},
		}),
	],
});
