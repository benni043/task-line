<script setup lang="ts">
	import { RadioGroupItem, RadioGroupRoot } from "reka-ui";
	import type { TimeRecurring } from "~~/shared/types";

	const { t } = useI18n();

	const timeRecurring = defineModel<TimeRecurring | undefined>("timeRecurring");
	const state = computed({
		get: () => timeRecurring.value?.mode ?? "none",
		set: (value) => {
			timeRecurring.value = value === "none" ? undefined : { mode: value };
		},
	});
</script>

<template>
	<div class="w-full h-full">
		<RadioGroupRoot v-model="state">
			<RadioGroupItem
				class="data-active:bg-secondary-hover border-secondary flex-1 cursor-pointer rounded-l border px-1"
				value="none"
			>
				{{ t("recurring-none") }}
			</RadioGroupItem>
			<RadioGroupItem
				class="data-active:bg-secondary-hover border-secondary flex-1 cursor-pointer border-y px-1"
				value="daily"
			>
				{{ t("recurring-daily") }}
			</RadioGroupItem>
			<RadioGroupItem
				class="data-active:bg-secondary-hover border-secondary flex-1 cursor-pointer rounded-r border px-1"
				value="weekly"
			>
				{{ t("recurring-weekly") }}
			</RadioGroupItem>
		</RadioGroupRoot>
	</div>
</template>
