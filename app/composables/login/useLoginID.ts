import { useLoginSession } from "./useLoginSession";

export function useLoginID() {
	const session = useLoginSession();

	return computed(() => {
		return session.value?.user?.id;
	});
}
