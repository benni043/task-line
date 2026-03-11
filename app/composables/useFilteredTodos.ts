import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
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
		if (todo.time?.type !== "range") return false;

		const start = parseDate(todo.time.start);
		const end = parseDate(todo.time.end);

		if (filter.time === "today") {
			const now = today(getLocalTimeZone());

			if (start.compare(now) > 0 || end.compare(now) < 0) {
				return false;
			}
		} else if (filter.time === "week") {
			const weekStart = today(getLocalTimeZone());
			const weekEnd = weekStart.add({ weeks: 1 });

			if (start.compare(weekEnd) > 0 || end.compare(weekStart) < 0) {
				return false;
			}
		}

		return true;
	});
}
