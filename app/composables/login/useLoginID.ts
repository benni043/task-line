import { useLoginSession } from "./useLoginSession";

export async function useLoginID() {
	const session = await useLoginSession();

	return computed(() => {
		return session.value?.user?.id;
	});
}
