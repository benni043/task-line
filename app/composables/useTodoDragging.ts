import { CalendarDate } from "@internationalized/date";
import type { UUID } from "~~/shared/types";

export function useTodoDragging() {
	const todoStore = useTodoStore();

	const draggedTodo = ref<UUID | null>(null);
	const hoveredTodo = ref<UUID | null>(null);
	const hoveredState = ref<"above" | "below" | null>(null);

	function startDrag(event: DragEvent, uuid: UUID) {
		event.dataTransfer?.setData("uuid", uuid);
		draggedTodo.value = uuid;
	}

	function endDrag() {
		draggedTodo.value = null;
		hoveredTodo.value = null;
		hoveredState.value = null;
	}

	function dragOver(event: DragEvent, uuid: UUID) {
		event.preventDefault();

		hoveredTodo.value = uuid;

		const hoveredIndex = todoStore.data.findIndex(
			(todo) => todo.uuid === hoveredTodo.value,
		);
		const draggedIndex = todoStore.data.findIndex(
			(todo) => todo.uuid === draggedTodo.value,
		);

		if (hoveredIndex === -1 || draggedIndex === -1) return;

		if (hoveredIndex > draggedIndex) {
			hoveredState.value = "below";
		} else {
			hoveredState.value = "above";
		}
	}

	function dragLeave(event: DragEvent) {
		event.preventDefault();
		hoveredTodo.value = null;
		hoveredState.value = null;
	}

	async function dropOnTodoHandler(event: DragEvent, uuid: UUID) {
		event.preventDefault();
		const dragedUUID = event.dataTransfer?.getData("uuid");

		if (!dragedUUID) return;

		todoStore.moveTodo(dragedUUID, uuid);
	}

	async function dropOnDayHandler(event: DragEvent, date: Date) {
		event.preventDefault();
		const dragedUUID = event.dataTransfer?.getData("uuid");

		if (!dragedUUID) return;

		const todo = todoStore.getTodoById(dragedUUID);
		if (!todo) return;

		const dateString = new CalendarDate(
			date.getFullYear(),
			date.getMonth() + 1,
			date.getDate(),
		).toString();

		todo.timeframe = {
			start: dateString,
			end: dateString,
		};
		await todoStore.updateTodo(dragedUUID, todo);
	}

	return {
		startDrag,
		endDrag,
		dropOnTodoHandler,
		dropOnDayHandler,
		dragOver,
		dragLeave,
		draggedTodo,
		hoveredTodo,
		hoveredState,
	};
}
