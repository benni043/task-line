import { authClient } from "~/utils/auth";

export async function useLoginSession() {
	return (await authClient.useSession(useFetch)).data;
}
