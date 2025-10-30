<script setup lang="ts">
	import type { Label } from "~~/shared/types";

	defineProps<{
		label: Label;
		isSelected: boolean;
		type: "tag" | "category";
		count?: number;
	}>();
	const emits = defineEmits(["press"]);
</script>
<template>
	<button
		type="button"
		:data-selected="isSelected ? isSelected : undefined"
		class="cursor-pointer rounded text-nowrap transition-all flex justify-between data-selected:bg-secondary"
		@click="emits('press')"
	>
		<span class="flex items-center gap-0.5">
			<Icon
				:style="{
          color: label.color,
        }"
				name="material-symbols:bookmark"
				size="24"
			/>
			{{ label.name }}
		</span>
		<span v-if="count" class="pr-1">{{ count }}</span>
	</button>
</template>
