<script setup lang="ts">
	const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	const startDay = defineModel<number>("startDay", { default: 0 });
	const endDay = defineModel<number>("endDay", { default: 6 });

	let selectingStart = true;
	function onSelectDay(index: number) {
		if (selectingStart) {
			startDay.value = index;

			if (endDay.value < index) {
				endDay.value = index;
			}

			selectingStart = false;
		} else {
			endDay.value = index;

			if (endDay.value < startDay.value) {
				[startDay.value, endDay.value] = [endDay.value, startDay.value];
			}

			selectingStart = true;
		}
	}
</script>

<template>
	<div class="flex h-10 border border-secondary rounded-md">
		<div
			v-for="(day, index) in weekDays"
			:key="day"
			:data-selected="index >= startDay && index <= endDay"
			:data-first="index === 0"
			class="data-[first=false]:border-l border-secondary data-[selected=true]:bg-secondary flex cursor-pointer items-center justify-center p-2 flex-1"
			@click="onSelectDay(index)"
		>
			{{ day }}
		</div>
	</div>
</template>
