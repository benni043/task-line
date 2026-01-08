<script setup lang="ts">
	import { useCategoryStore } from "~/stores/useCategoryStore";
	import type { Category as CategoryType } from "~~/shared/types";
	import AddCategory from "./labels/AddCategory.vue";
	import Category from "./labels/Category.vue";

	const { t } = useI18n();

	const categoryStore = useCategoryStore();
	const todoStore = useTodoStore();

	function onAddCategory(category: CategoryType) {
		categoryStore.add(category.name, category.color, category.icon);
	}

	function onSaveCategory(category: CategoryType) {
		categoryStore.update(
			category.uuid,
			category.color,
			category.name,
			category.icon,
		);
	}

	function onDeleteCategory(category: CategoryType) {
		categoryStore.delete(category.uuid);
	}

	function isUsed(category: CategoryType): boolean {
		return todoStore.isCategoryUsed(category.uuid);
	}
</script>

<template>
	<div data-testid="add-category" class="p-1 pt-0">
		<h2 class="text-muted-text text-lg">{{ t("categories") }}</h2>
		<AddCategory @add="onAddCategory" />
		<div data-testid="category-list">
			<div
				v-for="category in categoryStore.data"
				:key="category.uuid"
				class="inline-block pr-1 pb-1"
			>
				<Category
					:category="category"
					:is-used="isUsed(category)"
					@save="onSaveCategory"
					@delete="onDeleteCategory"
				/>
			</div>
		</div>
	</div>
</template>
