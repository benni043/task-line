<script setup lang="ts">
	import { useCategoryStore } from "~/stores/useCategoryStore";
	import type { Label as LabelType, UUID } from "~~/shared/types";
	import CustomLabel from "../Label.vue";

	const activeCategory = defineModel<UUID | undefined>("category", {
		required: true,
	});

	const categoryStore = useCategoryStore();
	const todoStore = useTodoStore();

	function onPress(category: UUID) {
		if (activeCategory.value === category) {
			activeCategory.value = undefined;
		} else {
			activeCategory.value = category;
		}
	}

	function isSelected(category: LabelType): boolean {
		return activeCategory.value === category.uuid;
	}

	const categoryCount = computed(() => {
		const map = new Map<UUID, number>();

		todoStore.data.forEach((todo) => {
			if (!todo.category) return;
			map.set(todo.category, (map.get(todo.category) ?? 0) + 1);
		});

		return map;
	});
</script>

<template>
	<div class="overflow-auto">
		<CustomLabel
			v-for="category in categoryStore.data"
			:key="category.uuid"
			:label="category"
			:count="categoryCount.get(category.uuid)"
			:is-selected="isSelected(category)"
			type="category"
			class="mr-1 mb-1"
			@press="onPress(category.uuid)"
		/>
	</div>
</template>
