<script setup lang="ts">
	import { parseDate } from "@internationalized/date";
	import type { DateRange } from "reka-ui";
	import {
		RangeCalendarCell,
		RangeCalendarCellTrigger,
		RangeCalendarGrid,
		RangeCalendarGridBody,
		RangeCalendarGridHead,
		RangeCalendarGridRow,
		RangeCalendarHeadCell,
		RangeCalendarHeader,
		RangeCalendarHeading,
		RangeCalendarNext,
		RangeCalendarPrev,
		RangeCalendarRoot,
	} from "reka-ui";
	import type { TimeRange } from "~~/shared/types";

	const { t, locale } = useI18n();

	const firstDayOfWeek = computed(() => {
		return locale.value === "de" ? 1 : 0;
	});

	const timeRange = defineModel<TimeRange | undefined>("timeRange");

	const dateRange: Ref<DateRange> = ref({
		start: undefined,
		end: undefined,
	});

	if (timeRange.value) {
		dateRange.value = {
			start: parseDate(timeRange.value.start),
			end: parseDate(timeRange.value.end),
		};
	}

	watch(dateRange, (value) => {
		if (value.end === undefined && value.start === undefined) {
			timeRange.value = undefined;
		} else if (value.end === undefined) {
			timeRange.value = {
				start: value.start!.toString(),
				end: value.start!.toString(),
			};
		} else {
			timeRange.value = {
				start: value.start!.toString(),
				end: value.end!.toString(),
			};
		}
	});

	function clear() {
		dateRange.value = {
			start: undefined,
			end: undefined,
		};
	}
</script>

<template>
	<div class="flex h-full justify-center">
		<RangeCalendarRoot
			v-slot="{ weekDays, grid }"
			v-model="dateRange"
			fixed-weeks
			class="flex h-full w-full max-w-96 flex-col gap-2 p-2"
			:locale="locale"
			:first-day-of-week="firstDayOfWeek"
		>
			<RangeCalendarHeader class="flex items-center justify-between">
				<button
					type="button"
					class="border-secondary hover:bg-secondary cursor-pointer rounded border px-2 text-center transition"
					@click="clear"
				>
					{{ t("clear") }}
				</button>
				<div class="flex items-center justify-between gap-2">
					<RangeCalendarPrev class="flex cursor-pointer">
						<Icon name="material-symbols:chevron-left-rounded" size="24" />
					</RangeCalendarPrev>
					<RangeCalendarHeading />
					<RangeCalendarNext class="flex cursor-pointer">
						<Icon name="material-symbols:chevron-right-rounded" size="24" />
					</RangeCalendarNext>
				</div>
			</RangeCalendarHeader>
			<RangeCalendarGrid
				v-for="month in grid"
				:key="month.value.toString()"
				class="flex flex-1 flex-col gap-2"
			>
				<RangeCalendarGridHead>
					<RangeCalendarGridRow class="flex">
						<RangeCalendarHeadCell
							v-for="day in weekDays"
							:key="day"
							class="flex-1 text-xs"
						>
							{{ day }}
						</RangeCalendarHeadCell>
					</RangeCalendarGridRow>
				</RangeCalendarGridHead>
				<RangeCalendarGridBody class="flex flex-1 flex-col gap-1">
					<RangeCalendarGridRow
						v-for="(weekDates, index) in month.rows"
						:key="`weekDate-${index}`"
						class="flex flex-1/7 gap-1"
					>
						<RangeCalendarCell
							v-for="weekDate in weekDates"
							:key="weekDate.toString()"
							:date="weekDate"
							class="flex-1"
						>
							<RangeCalendarCellTrigger
								class="border-secondary data-outside-view:text-muted-text data-selected:bg-secondary data-today:text-primary data-selection-end:bg-secondary-hover data-selection-start:bg-secondary-hover flex h-full w-full cursor-pointer items-center justify-center rounded-md border"
								:day="weekDate"
								:month="month.value"
							/>
						</RangeCalendarCell>
					</RangeCalendarGridRow>
				</RangeCalendarGridBody>
			</RangeCalendarGrid>
		</RangeCalendarRoot>
	</div>
</template>
