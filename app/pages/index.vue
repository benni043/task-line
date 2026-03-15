<script setup lang="ts">
	import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "reka-ui";
	import { onMounted } from "vue";
	import { useDevice } from "#imports";
	import NewTodoSheet from "~/components/edit/NewTodoSheet.vue";
	import HorizontalNav from "~/components/nav/HorizontalNav.vue";
	import VerticalNav from "~/components/nav/VerticalNav.vue";
	import Todos from "~/components/todo/Todos.vue";
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
</script>
<template>
	<div>
		<FilterSheet v-model:is-open="isFilterSheetOpen" />
		<SettingsSheet v-model:is-open="isSettingsSheetOpen" />
		<EditTodoSheet />
		<NewTodoSheet v-model:is-open="isNewSheetOpen" />

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
