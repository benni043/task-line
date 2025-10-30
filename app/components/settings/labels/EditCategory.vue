<script setup lang="ts">
	import type { Label } from "~~/shared/types";
	import EditLabel from "./EditLabel.vue";

	defineProps<{ defaultLabel: Label }>();

	const emit = defineEmits<{ save: [Label] }>();

	function onClick(label: Label) {
		emit("save", label);
	}
</script>
<template>
	<EditLabel :defaultLabel="defaultLabel" @save="onClick">
		<template #display>
			<slot/>
		</template>
		<template #edit>Category</template>
	</EditLabel>
</template>
