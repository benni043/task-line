import type { Session, User } from "better-auth";

export function useLoginSession() {
	const session = ref<{ session: Session; user: User } | null>(null);

	async function load() {
		const { data } = await authClient.useSession(useFetch);

		watch(
			data,
			() => {
				session.value = data.value;
			},
			{ immediate: true },
		);
	}

	load();

	return session;
}
