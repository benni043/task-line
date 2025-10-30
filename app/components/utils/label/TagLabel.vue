<script setup lang="ts">
	import type { Label } from "~~/shared/types";

	const props = defineProps<{
		label: Label;
		isSelected: boolean;
		type: "tag" | "category";
		count?: number;
	}>();
	const emits = defineEmits(["press"]);

	const bgColor = computed(() => {
		return props.isSelected ? props.label.color : "transparent";
	});

	const fontColor = computed(() => {
		return props.isSelected ? "white" : props.label.color;
	});
</script>
<template>
	<button
		type="button"
		class="cursor-pointer rounded border px-1 text-nowrap transition-all"
		:class="{
      'border-secondary': type == 'tag',
    }"
		:style="{
      color: fontColor,
      'background-color': bgColor,
    }"
		@click="emits('press')"
	>
		{{ label.name }}
		<span v-if="count" class="border-l pl-1">{{ count }}</span>
	</button>
</template>
