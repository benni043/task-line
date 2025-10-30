<script setup lang="ts">
	import type { Category, Label } from "~~/shared/types";
	import EditCategory from "./EditCategory.vue";
	import LabelShell from "./LabelShell.vue";

	const props = defineProps<{
		category: Category;
		isUsed: boolean;
	}>();
	const emit = defineEmits<{ save: [Category]; delete: [Category] }>();

	function onSaveLabel(label: Category) {
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
		class="border-secondary flex items-center gap-0.5 rounded border pl-1"
	>
		<EditCategory :default-label="props.category" @save="onSaveLabel">
			<div class="cursor-pointer flex gap-1 justify-center h-full">
				<Icon
					:style="{ color: category.color }"
					:name="category.icon ?? 'material-symbols:bookmark'"
					size="24"
				/>
				{{ category.name }}
			</div>
		</EditCategory>
	</LabelShell>
</template>
