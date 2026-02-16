<script setup lang="ts">
	import { useCategoryStore } from "~/stores/useCategoryStore";
	import { useTagStore } from "~/stores/useTagStore";
	import type { Label as LabelType, Todo } from "~~/shared/types";
	import TagLabel from "../utils/label/TagLabel.vue";
	import TimeDisplay from "./TimeDisplay.vue";

	const props = defineProps<{ data: Todo }>();

	const checking = ref(false);
	const todoStore = useTodoStore();

	function onCheck() {
		checking.value = true;
		setTimeout(() => {
			todoStore.removeTodo(props.data.uuid);
		}, 1000);
	}

	const { filter } = useFilter();
	const tagStore = useTagStore();
	const categoryStore = useCategoryStore();

	const tags = computed(() => {
		return props.data.tags
			.map((tagId) => {
				const tag = tagStore.getByUUID(tagId);
				if (!tag) {
					//todo - show in toast
					console.warn(`Tag with id ${tagId} not found`);
				}
				return tag;
			})
			.filter((tag) => !!tag)
			.filter((tag) => !filter.value.tags.includes(tag.uuid))
			.sort((a, b) => a.name.localeCompare(b.name));
	});

	function onTagPress(tag: LabelType) {
		filter.value.tags.push(tag.uuid);
	}
	const category = computed(() => {
		if (!props.data.category) return undefined;
		if (filter.value.category === props.data.category) return undefined;

		return categoryStore.getByUUID(props.data.category);
	});

	const localeRoute = useLocaleRoute();

	async function onOpenTodo() {
		await navigateTo(
			localeRoute({ name: "index", query: { uuid: props.data.uuid } }),
		);
	}
</script>

<template>
	<div data-testid="todo" class="relative flex flex-col justify-center">
		<div class="flex items-center gap-1 pt-2 pb-1">
			<button
				type="button"
				class="cursor-pointer"
				:disabled="checking"
				@click="onCheck()"
			>
				<div
					class="border-secondary m-1 flex h-8 w-8 items-center justify-center rounded-xl border-2 transition-all"
					:style="{
            'border-color': category?.color,
          }"
					:title="category?.name"
				>
					<transition
						class="transition-opacity duration-500"
						enter-from-class="opacity-0"
					>
						<icon
							v-if="checking"
							size="24"
							name="material-symbols:check-rounded"
						/>
					</transition>
				</div>
			</button>
			<div class="flex w-full flex-col">
				<button
					type="button"
					class="flex cursor-pointer items-center text-left text-lg"
					@click="onOpenTodo"
				>
					<icon
						v-if="data.note"
						data-testid="note-icon"
						size="20"
						name="material-symbols:note-outline"
					/>
					{{ data.title }}
				</button>
				<div class="flex gap-1">
					<TagLabel
						v-for="tag in tags"
						:key="tag?.uuid"
						:label="tag"
						type="tag"
						:is-selected="false"
						class="text-xs"
						@press="onTagPress(tag)"
					/>
				</div>
			</div>
		</div>
		<TimeDisplay v-if="data.timeframe" :timeframe="data.timeframe!" />
	</div>
</template>
