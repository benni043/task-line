<script setup lang="ts">
	import { computed, ref } from "vue";
	import type { TodoData, UUID } from "~~/shared/types";
	import Sheet from "../utils/Sheet.vue";
	import DataSelect from "./DataSelect.vue";
	import TitleSelect from "./TitleSelect.vue";

	const isOpen = ref(false);

	const uuid = ref<UUID>("");
	const todoData = ref<TodoData>({
		title: "",
		note: "",
		tags: [],
		time: undefined,
		category: undefined,
		checks: [],
	});

	const todoStore = useTodoStore();
	const { getTodoById } = storeToRefs(todoStore);

	const showSaveIcon = ref(true);

	const route = useRoute();
	watch(
		() => route.query.uuid,
		() => {
			if (!route.query.uuid) return;

			uuid.value = route.query.uuid as UUID;
			const todo = getTodoById.value(uuid.value)!;

			todoData.value.title = todo.title;
			todoData.value.note = todo.note;
			todoData.value.tags = [...todo.tags];
			todoData.value.category = todo.category;
			todoData.value.time = todo.time;
			todoData.value.checks = [...(todo.checks ?? [])];

			isOpen.value = true;
		},
		{ immediate: true },
	);

	async function onSaveTodo() {
		todoStore.updateTodo(uuid.value, todoData.value);

		showSaveIcon.value = false;
		setTimeout(() => {
			showSaveIcon.value = true;
		}, 1000);
	}

	const localeRoute = useLocaleRoute();

	async function close() {
		isOpen.value = false;
		await navigateTo(localeRoute({ name: "index" }));
	}

	const isValid = computed(() => {
		return todoData.value.title !== "";
	});
</script>

<template>
	<Sheet :is-open="isOpen" title="Edit Todo Sheet" @close="close">
		<form
			data-testid="edit-todo-sheet"
			class="flex h-full flex-col justify-between pt-1"
			@submit.prevent="onSaveTodo"
		>
			<TitleSelect v-model:title="todoData.title" />
			<DataSelect
				v-model:time="todoData.time"
				v-model:tags="todoData.tags"
				v-model:category="todoData.category"
				v-model:note="todoData.note"
			/>
			<button
				type="submit"
				data-testid="submit-edit-todo-button"
				:disabled="!isValid"
				class="bg-primary hover:bg-primary-hover disabled:bg-secondary flex aspect-square h-10 cursor-pointer items-center justify-center rounded transition-colors"
			>
				<Icon
					v-if="showSaveIcon"
					name="material-symbols:save-rounded"
					size="24"
				/>
				<Icon v-else name="material-symbols:check-rounded" size="24" />
			</button>
		</form>
	</Sheet>
</template>
