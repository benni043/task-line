import { DatabaseSync } from "node:sqlite";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
	database: new DatabaseSync("./.data/sqlite.db"),
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},
});
