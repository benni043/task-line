import { useCategoryStore } from "~/stores/useCategoryStore";
import { useTagStore } from "~/stores/useTagStore";
import { useLoginID } from "./login/useLoginID";

export async function useInitdata() {
	const todoStore = useTodoStore();
	const tagStore = useTagStore();
	const categoryStore = useCategoryStore();

	const Init = {
		client() {
			todoStore.initSSE();
			tagStore.initSSE();
			categoryStore.initSSE();
		},
		async data() {
			await Promise.all([
				todoStore.fetch(),
				tagStore.fetch(),
				categoryStore.fetch(),
			]);
		},
		async all() {
			Init.client();
			await Init.data();
		},
	};

	function reset() {
		todoStore.reset();
		tagStore.reset();
		categoryStore.reset();
	}

	const id = useLoginID();

	onMounted(async () => {
		watch(id, async () => {
			if (id.value) Init.all();
			else reset();
		});
	});

	await callOnce(async () => {
		if (id.value) await Init.data();
	});

	const focus = useWindowFocus();
	watch([focus], async ([focus]) => {
		if (focus && id.value) {
			await Init.data();
		}
	});
}
