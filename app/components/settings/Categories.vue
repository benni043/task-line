<script setup lang="ts">
	import { useCategoryStore } from "~/stores/labels/useCategoryStore";
	import type { Label as LabelType } from "~~/shared/types";
	import AddLabel from "./labels/AddLabel.vue";
	import CustomLabel from "./labels/Label.vue";

	const { t } = useI18n();

	const categoryStore = useCategoryStore();
	const todoStore = useTodoStore();

	function onAddCategory(category: LabelType) {
		categoryStore.add(category.name, category.color);
	}

	function onSaveCategory(Category: LabelType) {
		categoryStore.update(Category.uuid, Category.color, Category.name);
	}

	function onDeleteCategory(Category: LabelType) {
		categoryStore.delete(Category.uuid);
	}

	function isUsed(category: LabelType): boolean {
		return todoStore.isCategoryUsed(category.uuid);
	}
</script>

<template>
	<div data-testid="add-category" class="p-1 pt-0">
		<h2 class="text-muted-text text-lg">{{ t("categories") }}</h2>
		<AddLabel @add="onAddCategory"/>
		<div data-testid="category-list">
			<div
				v-for="category in categoryStore.data"
				:key="category.uuid"
				class="inline-block pr-1 pb-1"
			>
				<CustomLabel
					class="flex items-center gap-0.5 rounded border pl-1"
					:style="{ color: category.color }"
					:label="category"
					:is-used="isUsed(category)"
					@save="onSaveCategory"
					@delete="onDeleteCategory"
				/>
			</div>
		</div>
	</div>
</template>
