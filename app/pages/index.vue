<script setup lang="ts">
	import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "reka-ui";
	import { onMounted } from "vue";
	import { useDevice } from "#imports";
	import NewTodoSheet from "~/components/Edit/NewTodoSheet.vue";
	import HorizontalNav from "~/components/Nav/HorizontalNav.vue";
	import VerticalNav from "~/components/Nav/VerticalNav.vue";
	import Todos from "~/components/Todo/Todos.vue";
	import { useLoginID } from "~/composables/login/useLoginID";
	import { useInitdata } from "~/composables/useInitData";

	const isSettingsSheetOpen = ref(false);
	const isFilterSheetOpen = ref(false);
	const isNewSheetOpen = ref(false);

	const id = await useLoginID();
	await useInitdata(id);

	onMounted(async () => {
		const session = (await authClient.getSession()).data;
		if (!session) {
			isSettingsSheetOpen.value = true;
		}
	});

	const { isMobile } = useDevice();

	onMounted(async () => {
		if ("serviceWorker" in navigator) {
			try {
				const reg = await navigator.serviceWorker.register("/sw.js");

				await navigator.serviceWorker.ready;

				console.log("SW ist bereit und aktiv:", reg.active);
			} catch (err) {
				console.error("SW registration failed", err);
			}
		}
	});

	async function send() {
		const permission = await Notification.requestPermission();

		if (permission !== "granted") return;

		const reg = await navigator.serviceWorker.ready;

		const sub = await reg.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey:
				"BKkvpMKOQ3wvNUpoohpuZmTUCNe8rH4bZwCbTeLW16F1ZeUm9DDEavdpXOfXIR6PWZpPswiCYte1KMveWMFvslY",
		});

		const fetch = useRequestFetch();

		const response = await fetch(`/api/subscription/`, {
			method: "POST",
			body: sub.toJSON(),
			...useFetchOptions(),
		}).catch(async (err) => {
			//todo - show in toast
			console.warn(err);
			// await this.fetch();
		});

		console.log(response);
	}

	async function msg() {
		const fetch = useRequestFetch();

		await fetch(`/api/subscription/sendNotification`, {
			method: "POST",
			...useFetchOptions(),
		}).catch(async (err) => {
			//todo - show in toast
			console.warn(err);
			// await this.fetch();
		});
	}
</script>
<template>
	<div>
		<FilterSheet v-model:is-open="isFilterSheetOpen" />
		<SettingsSheet v-model:is-open="isSettingsSheetOpen" />
		<EditTodoSheet />
		<NewTodoSheet v-model:is-open="isNewSheetOpen" />

		<div>
			<h1>testing begin</h1>

			<button type="button" @click="send()">send</button>
			<br>
			<button type="button" @click="msg()">message</button>

			<h1>testing end</h1>
		</div>

		<div v-if="!isMobile">
			<SplitterGroup direction="horizontal">
				<SplitterPanel
					:default-size="220"
					:min-size="220"
					:size-unit="'px'"
					class="min-w-55"
				>
					<VerticalNav
						v-model:is-settings-sheet-open="isSettingsSheetOpen"
						v-model:is-filter-sheet-open="isFilterSheetOpen"
						v-model:is-new-sheet-open="isNewSheetOpen"
					/>
				</SplitterPanel>
				<SplitterResizeHandle class="w-2" />
				<!-- workaround to correctly display on ssr -->
				<SplitterPanel :size-unit="'%'" :default-size="5000">
					<div class="overflow-x-hidden">
						<TimeHeader />
						<Todos />
					</div>
				</SplitterPanel>
			</SplitterGroup>
		</div>

		<div v-if="isMobile">
			<TimeHeader />
			<Todos />
			<HorizontalNav
				v-model:is-settings-sheet-open="isSettingsSheetOpen"
				v-model:is-filter-sheet-open="isFilterSheetOpen"
				v-model:is-new-sheet-open="isNewSheetOpen"
			/>
		</div>
	</div>
</template>
