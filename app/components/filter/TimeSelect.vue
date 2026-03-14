<script setup lang="ts">
	import { RadioGroupItem, RadioGroupRoot } from "reka-ui";

	const { t } = useI18n();

	const time = defineModel<"all" | "today" | "week">("time", {
		required: true,
	});
</script>

<template>
	<RadioGroupRoot v-model="time" class="flex">
		<RadioGroupItem
			class="data-active:bg-secondary-hover border-secondary flex-1 cursor-pointer rounded-l border px-1"
			value="all"
		>
			{{ t("all") }}
		</RadioGroupItem>
		<RadioGroupItem
			class="data-active:bg-secondary-hover border-secondary flex-1 cursor-pointer border-y px-1"
			value="today"
		>
			{{ t("today") }}
		</RadioGroupItem>
		<RadioGroupItem
			class="data-active:bg-secondary-hover border-secondary flex-1 cursor-pointer rounded-r border px-1"
			value="week"
		>
			{{ t("week") }}
		</RadioGroupItem>
	</RadioGroupRoot>
</template>
