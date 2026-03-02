import { DatabaseSync } from "node:sqlite";
import { apiKey } from "@better-auth/api-key";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
	database: new DatabaseSync("./.data/sqlite.db"),
	trustedOrigins: [...process.env.TRUSTED_ORIGINS!.split(",")],
	session: {
		expiresIn: 3600 * 24 * 30, // 30 days
		updateAge: 3600 * 24 * 7, // 7 days
	},
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
