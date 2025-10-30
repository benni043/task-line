<script setup lang="ts">
	import TimeSelect from "../filter/TimeSelect.vue";
	import CategorySelect from "../utils/label/CategorySelect.vue";
	import TagSelect from "../utils/label/TagSelect.vue";

	const { t } = useI18n();

	const { filter } = useFilter();

	const isSettingsSheetOpen = defineModel<boolean>("isSettingsSheetOpen");
	const isNewSheetOpen = defineModel<boolean>("isNewSheetOpen");
</script>

<template>
	<div class="bg-surface left-0 flex h-dvh w-full flex-col justify-between p-1">
		<div class="flex flex-col gap-2">
			<div>
				<TimeSelect v-model:time="filter.time"/>
			</div>
			<div>
				<h2 class="text-muted-text flex items-center gap-0.5 text-sm mb-1">
					<Icon name="material-symbols:grid-view-rounded"/>
					{{ t("categories") }}
				</h2>
				<CategorySelect v-model:category="filter.category"/>
			</div>
			<div>
				<h2 class="text-muted-text flex items-center gap-0.5 text-sm mb-1">
					<Icon name="material-symbols:bookmark"/>
					{{ t("tags") }}
				</h2>
				<TagSelect v-model:tags="filter.tags" :show-all="false"/>
			</div>
		</div>
		<div class="flex gap-1">
			<button
				data-testid="settings-button"
				class="bg-secondary hover:bg-secondary-hover relative flex aspect-square h-10 cursor-pointer items-center justify-center rounded transition-colors"
				@click="isSettingsSheetOpen = true"
			>
				<Icon name="material-symbols:settings-outline-rounded" size="24"/>
			</button>
			<button
				data-testid="new-todo-button"
				class="bg-primary hover:bg-primary-hover relative flex flex-1 aspect-square h-10 cursor-pointer items-center justify-center rounded transition-colors"
				@click="isNewSheetOpen = true"
			>
				<Icon name="material-symbols:add-2-rounded" size="24"/>
			</button>
		</div>
	</div>
</template>
