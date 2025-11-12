import { useLoginSession } from "./useLoginSession";

export async function useLoginImageUrl() {
	const session = await useLoginSession();

	return computed(() => {
		return session.value?.user?.image;
	});
}
