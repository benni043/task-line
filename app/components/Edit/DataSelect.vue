<script setup lang="ts">
	import {
		TabsContent,
		TabsIndicator,
		TabsList,
		TabsRoot,
		TabsTrigger,
	} from "reka-ui";
	import type { Time, UUID } from "~~/shared/types";
	import CategorySelect from "../Utils/Label/CategorySelect.vue";
	import TagSelect from "../Utils/Label/TagSelect.vue";
	import NoteSelect from "./NoteSelect.vue";
	import TimePointSelect from "./Time/TimePointSelect.vue";
	import TimeRangeSelect from "./Time/TimeRangeSelect.vue";
	import TimeRecurringSelect from "./Time/TimeRecurringSelect.vue";

	const { t } = useI18n();

	const time = defineModel<Time | undefined>("time", {
		required: true,
	});
	const tags = defineModel<UUID[]>("tags", { required: true });
	const category = defineModel<UUID | undefined>("category", {
		required: true,
	});
	const note = defineModel<string>("note", { required: true });

	function useTimeComputed<T extends Time["type"]>(
		marker: T,
	): ComputedRef<Omit<Extract<Time, { type: T }>, "type"> | undefined> {
		return computed<Omit<Extract<Time, { type: T }>, "type"> | undefined>({
			get(): Omit<Extract<Time, { type: T }>, "type"> | undefined {
				if (time.value?.type !== marker) return undefined;

				const { type, ...rest } = time.value as Extract<Time, { type: T }>;
				return rest;
			},
			set(value) {
				if (!value) {
					time.value = undefined;
					return;
				}

				time.value = {
					type: marker,
					...value,
				} as Extract<Time, { type: T }>;
			},
		});
	}

	const timeRange = useTimeComputed("range");
	const timeRecurring = useTimeComputed("recurring");
	const timePoint = useTimeComputed("point");

	const activeTab = ref("notes");
	const selectedTimeType = ref<"range" | "recurring" | "point">(
		time.value?.type ?? "range",
	);

	watch(selectedTimeType, (_value) => {
		time.value = undefined;
	});
</script>

<template>
	<TabsRoot
		class="flex flex-1 flex-col px-2 overflow-y-auto"
		v-model="activeTab"
	>
		<TabsList
			class="border-secondary relative flex justify-around border-b py-1"
		>
			<TabsIndicator
				class="bg-primary absolute bottom-0 left-0 h-px w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) translate-y-px rounded-full duration-300"
			>
				<div />
			</TabsIndicator>
			<TabsTrigger
				class="data-[state=active]:text-primary w-24 cursor-pointer transition"
				value="notes"
			>
				{{ t("note") }}
			</TabsTrigger>
			<TabsTrigger
				class="data-[state=active]:text-primary w-24 cursor-pointer transition"
				value="labels"
			>
				{{ t("labels") }}
			</TabsTrigger>
			<TabsTrigger
				class="data-[state=active]:text-primary w-24 cursor-pointer transition"
				value="date"
			>
				<select v-model="selectedTimeType" :disabled="activeTab !== 'date'">
					<option value="range">{{ t("date-range") }} </option>
					<option value="recurring">{{ t("date-recurring") }} </option>
					<option value="point">{{ t("date-point") }} </option>
				</select>
			</TabsTrigger>
		</TabsList>
		<div class="overflow-scroll h-full">
			<TabsContent value="notes" class="relative h-full py-2">
				<NoteSelect v-model:note="note" />
			</TabsContent>

			<TabsContent value="labels" class="pt-2">
				<h2 class="text-muted-text text-lg">{{ t("categories") }}</h2>
				<CategorySelect v-model:category="category" />
				<h2 class="text-muted-text text-lg">{{ t("tags") }}</h2>
				<TagSelect v-model:tags="tags" :show-all="true" />
			</TabsContent>

			<TabsContent class="flex h-full flex-col justify-center" value="date">
				<TimeRangeSelect
					v-if="selectedTimeType === 'range'"
					v-model:timeRange="timeRange"
				/>
				<TimeRecurringSelect
					v-if="selectedTimeType === 'recurring'"
					v-model:timeRecurring="timeRecurring"
				/>
				<TimePointSelect
					v-if="selectedTimeType === 'point'"
					v-model:timePoint="timePoint"
				/>
			</TabsContent>
		</div>
	</TabsRoot>
</template>
