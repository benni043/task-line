import { CalendarDate } from "@internationalized/date";
import type { UUID } from "~~/shared/types";

export function useTodoDragging() {
  const todoStore = useTodoStore();

  function startDrag(event: DragEvent, uuid: UUID) {
    event.dataTransfer?.setData("uuid", uuid);
    (event.target as HTMLElement).dataset.dragged = "true";
  }

  function endDrag(event: DragEvent) {
    delete (event.target as HTMLElement).dataset.dragged;
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
  };
}
