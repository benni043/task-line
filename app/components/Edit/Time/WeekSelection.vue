<script setup lang="ts">
	const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	const range = defineModel<{ start: number; end: number }>("range", {
		default: { start: 0, end: 6 },
	});

	let selectingStart = true;
	function onSelectDay(index: number) {
		let start = range.value.start;
		let end = range.value.end;

		if (selectingStart) {
			start = index;

			if (end < index) {
				end = index;
			}

			selectingStart = false;
		} else {
			end = index;

			if (end < start) {
				[start, end] = [end, start];
			}

			selectingStart = true;
		}

		range.value = { start, end };
	}
</script>

<template>
	<div class="flex h-10 border border-secondary rounded-md">
		<div
			v-for="(day, index) in weekDays"
			:key="day"
			:data-selected="index >= range.start && index <= range.end"
			:data-first="index === 0"
			class="data-[first=false]:border-l border-secondary data-[selected=true]:bg-secondary flex cursor-pointer items-center justify-center p-2 flex-1"
			@click="onSelectDay(index)"
		>
			{{ day }}
		</div>
	</div>
</template>
