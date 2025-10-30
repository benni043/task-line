<script setup lang="ts">
	import type { Label } from "~~/shared/types";
	import EditLabel from "./EditLabel.vue";
	import LabelShell from "./LabelShell.vue";

	const props = defineProps<{
		tag: Label;
		isUsed: boolean;
	}>();
	const emit = defineEmits<{ save: [Label]; delete: [Label] }>();

	function onSaveLabel(label: Label) {
		label.uuid = props.tag.uuid;
		emit("save", label);
	}

	function onDeleteLabel() {
		emit("delete", props.tag);
	}
</script>
<template>
	<LabelShell
		:is-used="props.isUsed"
		@delete="onDeleteLabel"
		class="border-secondary flex items-center gap-0.5 rounded border pl-1"
		:style="{ color: tag.color }"
	>
		<EditLabel :default-label="props.tag" @save="onSaveLabel">
			<template #display>
				<div class="cursor-pointer">{{ tag.name }}</div>
			</template>
		</EditLabel>
	</LabelShell>
</template>
