import {
	getLocalTimeZone,
	parseAbsoluteToLocal,
	parseDate,
	today,
} from "@internationalized/date";
import { getTimeRange } from "~~/shared/todo";
import type { Todo } from "~~/shared/types";

export function useFilteredTodos() {
	const todoStore = useTodoStore();
	const { filter } = useFilter();

	const filterdTodos = computed(() => {
		return filterTodos(todoStore.data, filter.value);
	});

	return filterdTodos;
}

export function filterTodos(todos: Todo[], filter: Filter) {
	return todos.filter((todo) => {
		//filter by tags
		for (const tag of filter.tags) {
			if (!todo.tags.includes(tag)) {
				return false;
			}
		}

		//filter by category
		if (filter.category) {
			if (filter.category !== todo.category) {
				return false;
			}
		}

		//filter by date
		if (filter.time === "all") return true;

		const weekStart = today(getLocalTimeZone());
		const weekEnd = weekStart.add({ weeks: 1 });

		if (todo.time?.type === "point") {
			const time = parseAbsoluteToLocal(todo.time.time);

			if (filter.time === "today") {
				if (
					time.compare(weekStart) < 0 ||
					time.compare(weekStart.add({ days: 1 })) > 0
				) {
					return false;
				}
			} else if (filter.time === "week") {
				if (
					time.compare(weekStart) < 0 ||
					time.compare(weekEnd.add({ days: 1 })) > 0
				) {
					return false;
				}
			}
			return true;
		}

		const time = getTimeRange(todo);
		if (time === undefined) return false;

		const start = parseDate(time.visuel.start);
		const end = parseDate(time.visuel.end);

		if (filter.time === "today") {
			if (start.compare(weekStart) > 0 || end.compare(weekStart) < 0) {
				return false;
			}
		} else if (filter.time === "week") {
			if (start.compare(weekEnd) > 0 || end.compare(weekStart) < 0) {
				return false;
			}
		}

		return true;
	});
}
