<script setup lang="ts">
	import {
		type DateValue,
		getLocalTimeZone,
		now,
		parseAbsoluteToLocal,
		toZoned,
	} from "@internationalized/date";
	import { DateFieldInput, DateFieldRoot } from "reka-ui";
	import type { TimePoint } from "~~/shared/types";

	const { t, locale } = useI18n();
	const timePoint = defineModel<TimePoint | undefined>("timePoint");

	if (timePoint.value === undefined) {
		timePoint.value = { time: now(getLocalTimeZone()).toAbsoluteString() };
	}

	const dateTime = computed({
		get: () => {
			if (timePoint.value) {
				return parseAbsoluteToLocal(timePoint.value.time);
			}

			return null;
		},
		set: (value: DateValue | undefined) => {
			if (value) {
				timePoint.value = {
					time: toZoned(value, getLocalTimeZone()).toAbsoluteString(),
				};
			} else {
				timePoint.value = undefined;
			}
		},
	});
</script>

<template>
	<div class="flex h-full justify-center">
		<div class="mt-2 flex gap-1 max-h-8 border border-secondary rounded">
			<DateFieldRoot
				:granularity="'minute'"
				:hourCycle="24"
				:locale="locale"
				v-model="dateTime"
				v-slot="{ segments }"
				class="flex select-none items-center"
			>
				<template v-for="item in segments" :key="item.part">
					<DateFieldInput v-if="item.part === 'literal'" :part="item.part">
						{{ item.value }}
					</DateFieldInput>
					<DateFieldInput
						v-else
						:part="item.part"
						class="px-1 focus:bg-secondary outline-0 rounded"
					>
						{{ item.value }}
					</DateFieldInput>
				</template>
			</DateFieldRoot>
		</div>
	</div>
</template>
