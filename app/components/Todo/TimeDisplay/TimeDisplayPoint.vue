<script setup lang="ts">
	import { parseAbsoluteToLocal } from "@internationalized/date";
	import { addDays, sanitizeDate } from "~~/shared/date";
	import type { TimePoint } from "~~/shared/types";

	const { point } = defineProps<{ point: TimePoint }>();

	const timeFrameString = computed(() => {
		return point.time;
	});

	const time = computed(() => {
		let time = parseAbsoluteToLocal(point.time).toDate().getTime();

		return {
			start: time - 1000 * 60 * 30,
			end: time + 1000 * 60 * 30,
		};
	});

	function capTime(time: number): number {
		return Math.min(
			Math.max(time, sanitizeDate(new Date()).getTime()),
			addDays(sanitizeDate(new Date()), 7).getTime(),
		);
	}

	const cappedTime = computed(() => {
		return {
			start: capTime(time.value.start),
			end: capTime(time.value.end),
		};
	});

	const width = computed(() => {
		const timeDiff = cappedTime.value.end - cappedTime.value.start;
		const numberOfDays = timeDiff / (24 * 60 * 60 * 1000.0);
		const percentage = numberOfDays / 7.0;
		return percentage;
	});

	const offset = computed(() => {
		const now = new Date();
		now.setHours(0, 0, 0, 0);

		const timeDiff = cappedTime.value.start - now.getTime();
		const numberOfDays = timeDiff / (24 * 60 * 60 * 1000.0);
		const percentage = numberOfDays / 7.0;
		return percentage;
	});

	const isCappedRight = computed(() => {
		return time.value.end > addDays(sanitizeDate(new Date()), 7).getTime();
	});

	const isCappedLeft = computed(() => {
		return time.value.start < sanitizeDate(new Date()).getTime();
	});
</script>

<template>
	<div
		class="relative flex h-2 flex-col justify-center"
		:title="timeFrameString"
	>
		<div
			class="absolute top-1/2 flex h-2 w-full -translate-y-1/2 justify-evenly"
		>
			<div
				v-for="n in 6"
				:key="n"
				class="bg-secondary h-2 w-0.5 rounded-full"
			/>
		</div>
		<div
			class="bg-primary absolute top-1/2 h-1 -translate-y-1/2 rounded-full"
			:style="{
        width: `${width * 100}%`,
        left: `${offset * 100}%`,
      }"
		/>
		<div
			v-if="isCappedRight"
			class="to-background absolute top-1/2 right-0 h-1 w-12 -translate-y-1/2 bg-linear-to-r from-transparent"
		/>
		<div
			v-if="isCappedLeft"
			class="to-background absolute top-1/2 left-0 h-1 w-12 -translate-y-1/2 bg-linear-to-l from-transparent"
		/>
		<div class="bg-secondary h-0.5 w-full rounded-full" />
	</div>
</template>
