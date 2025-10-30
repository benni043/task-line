<script setup lang="ts">
	import type { Label, Category } from "~~/shared/types";
	import EditLabel from "./EditLabel.vue";

	const { t } = useI18n();

	const props = defineProps<{ defaultLabel: Category }>();

	const emit = defineEmits<{ save: [Category] }>();

	const icon = ref(props.defaultLabel.icon);

	function onClick(label: Label) {
		const category = label as Category;
		category.icon = icon.value;

		emit("save", category);
	}
</script>
<template>
	<EditLabel :defaultLabel="defaultLabel" @save="onClick">
		<template #display>
			<slot/>
		</template>
		<template #edit>
			<input
				v-model="icon"
				data-testid="edit-label-icon-input"
				class="border-secondary-popover h-8 w-36 rounded border pl-1"
				:placeholder="t('icon')"
				type="text"
			>
		</template>
	</EditLabel>
</template>
