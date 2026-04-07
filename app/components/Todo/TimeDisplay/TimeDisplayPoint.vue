<script setup lang="ts">
	import { parseAbsoluteToLocal } from "@internationalized/date";
	import { addDays, sanitizeDate } from "~~/shared/date";
	import type { TimePoint } from "~~/shared/types";

	const { point } = defineProps<{ point: TimePoint }>();

	const time = computed(() => {
		return parseAbsoluteToLocal(point.time).toDate().getTime();
	});

	const offset = computed(() => {
		const now = new Date();
		now.setHours(0, 0, 0, 0);

		const timeDiff = time.value - now.getTime();
		const numberOfDays = timeDiff / (24 * 60 * 60 * 1000.0);
		const percentage = numberOfDays / 7.0;

		return percentage;
	});

	const isCappedRight = computed(() => {
		return time.value > addDays(sanitizeDate(new Date()), 7).getTime();
	});

	const isCappedLeft = computed(() => {
		return time.value < sanitizeDate(new Date()).getTime();
	});
</script>

<template>
	<div class="relative flex h-2 flex-col justify-center" :title="point.time">
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
			v-if="!isCappedLeft && !isCappedRight"
			class="bg-primary absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
			:style="{
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
