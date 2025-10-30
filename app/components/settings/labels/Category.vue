<script setup lang="ts">
	import type { Label } from "~~/shared/types";
	import EditCategory from "./EditCategory.vue";
	import LabelShell from "./LabelShell.vue";

	const props = defineProps<{
		category: Label;
		isUsed: boolean;
	}>();
	const emit = defineEmits<{ save: [Label]; delete: [Label] }>();

	function onSaveLabel(label: Label) {
		label.uuid = props.category.uuid;
		emit("save", label);
	}

	function onDeleteLabel() {
		emit("delete", props.category);
	}
</script>
<template>
	<LabelShell
		:is-used="props.isUsed"
		@delete="onDeleteLabel"
		class="flex items-center gap-0.5 rounded border pl-1"
		:style="{ color: category.color }"
	>
		<EditCategory :default-label="props.category" @save="onSaveLabel">
			<div class="cursor-pointer">{{ category.name }}</div>
		</EditCategory>
	</LabelShell>
</template>
