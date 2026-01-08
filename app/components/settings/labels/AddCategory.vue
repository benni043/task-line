<script setup lang="ts">
	import type { Category } from "~~/shared/types";
	import EditCategory from "./EditCategory.vue";

	const { t } = useI18n();

	const defaultLabel = ref({
		uuid: "",
		color: "#009966",
		name: "",
		icon: "",
	});

	const emit = defineEmits<{ add: [Category] }>();

	function onAddTag(label: Category) {
		emit("add", label);
	}
</script>
<template>
	<EditCategory :default-label="defaultLabel" @save="onAddTag">
		<div
			data-testid="add-label-button"
			class="border-secondary flex cursor-pointer items-center gap-1 rounded border px-1"
		>
			<Icon name="material-symbols:add-2-rounded" size="20" />
			{{ t("new") }}
		</div>
	</EditCategory>
</template>
