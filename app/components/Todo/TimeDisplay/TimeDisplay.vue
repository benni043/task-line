<script setup lang="ts">
	import type { TimePoint, TimeRange } from "~~/shared/types";
	import TimeDisplayPoint from "./TimeDisplayPoint.vue";
	import TimeDisplayRange from "./TimeDisplayRange.vue";

	const props = defineProps<{ timeframe: TimeRange | TimePoint }>();

	const point = computed(() => {
		if ("type" in props.timeframe) {
			return props.timeframe as TimePoint;
		}
	});

	const range = computed(() => {
		if ("start" in props.timeframe) {
			return props.timeframe as TimeRange;
		}
	});
</script>

<template>
	<TimeDisplayPoint v-if="point" :point="point" />
	<TimeDisplayRange v-if="range" :range="range" />
</template>
