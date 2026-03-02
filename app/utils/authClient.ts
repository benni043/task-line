import { apiKeyClient } from "@better-auth/api-key/client";
import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
	plugins: [apiKeyClient()],
});
