import { v4 } from "uuid";
import type { Category, UUID } from "~~/shared/types";

export const useCategoryStore = defineStore("categories", {
	state: (): { data: Category[]; sse: EventSource | undefined } => ({
		data: [],
		sse: undefined,
	}),
	actions: {
		async fetch() {
			const fetch = useRequestFetch();
			const data = await fetch<Category[]>(`/api/categories`, {
				...useFetchOptions(),
			}).catch(async (err) => {
				//todo - show in toast
				console.warn(err);
				return [];
			});

			this.data = data;
		},
		reset() {
			this.data = [];
			this.stopSSE();
		},

		async initSSE() {
			this.stopSSE();
			this.sse = new EventSource(`/api/categories/sse`);

			this.sse.onmessage = (event) => {
				const labels = JSON.parse(event.data);
				this.data = labels;
			};
		},
		stopSSE() {
			if (!this.sse) return;
			this.sse.close();
		},

		async delete(uuid: UUID) {
			this.data = this.data.filter((label) => label.uuid !== uuid);

			const fetch = useRequestFetch();
			await fetch(`/api/categories/${uuid}`, {
				method: "DELETE",
				...useFetchOptions(),
			}).catch(async (err) => {
				//todo - show in toast
				console.warn(err);
				await this.fetch();
			});
		},
		async add(name: string, color: string, icon: string) {
			const label = {
				uuid: v4(),
				name,
				color,
				icon,
			};

			this.data.unshift(label);

			const fetch = useRequestFetch();
			await fetch(`/api/categories`, {
				method: "POST",
				body: label,
				...useFetchOptions(),
			}).catch(async (err) => {
				//todo - show in toast
				console.warn(err);
				await this.fetch();
			});
		},

		async update(uuid: UUID, color: string, name: string, icon: string) {
			const label = {
				uuid,
				color,
				name,
				icon,
			};

			const index = this.data.findIndex((value) => value.uuid === uuid);
			this.data[index] = label;

			const fetch = useRequestFetch();
			await fetch(`/api/categories`, {
				method: "POST",
				body: label,
				...useFetchOptions(),
			}).catch(async (err) => {
				//todo - show in toast
				console.warn(err);
				await this.fetch();
			});
		},
	},
	getters: {
		getByUUID(state) {
			return (uuid: UUID | undefined) =>
				state.data.find((label) => label.uuid === uuid);
		},
	},
});
