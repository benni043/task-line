<script setup lang="ts">
	import { RadioGroupItem, RadioGroupRoot } from "reka-ui";
	import type { TimeRecurring } from "~~/shared/types";
	import WeekSelection from "./WeekSelection.vue";

	const { t } = useI18n();

	const timeRecurring = defineModel<TimeRecurring | undefined>("timeRecurring");
	const state = computed({
		get: () => timeRecurring.value?.mode ?? "none",
		set: (value) => {
			switch (value) {
				case "none":
					timeRecurring.value = undefined;
					break;
				case "daily":
					timeRecurring.value = { mode: "daily" };
					break;
				case "weekly":
					console.log("weekly");
					timeRecurring.value = { mode: "weekly", start: 0, end: 6 };
					break;
			}
		},
	});

	const range = computed({
		get: () => {
			if (timeRecurring.value?.mode === "weekly") {
				return {
					start: timeRecurring.value?.start ?? 0,
					end: timeRecurring.value?.end ?? 6,
				};
			}
			return { start: 0, end: 6 };
		},
		set: ({ start, end }) => {
			if (timeRecurring.value?.mode === "weekly") {
				timeRecurring.value = {
					...timeRecurring.value,
					start,
					end,
				};
			}
		},
	});
</script>

<template>
	<div class="w-full h-full mt-2 flex flex-col gap-2">
		<RadioGroupRoot v-model="state" class="h-10 flex">
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

		<WeekSelection
			v-if="timeRecurring?.mode === 'weekly'"
			v-model:range="range"
		/>
	</div>
</template>
