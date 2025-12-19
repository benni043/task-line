import { authClient } from "~/utils/authClient";

export async function useLoginSession() {
	return (await authClient.useSession(useFetch)).data;
}
