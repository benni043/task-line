import type { TimeRange, Todo } from "~~/shared/types";
import { addDays, sanitizeDate, toLocalDateString } from "./date";

export function isChecked(todo: Todo): boolean {
	if (todo.time?.type !== "recurring") {
		return false;
	}

	const timeRange = getTimeRange(todo)!;

	const lastCheck = todo.checks[todo.checks.length - 1];
	if (!lastCheck) {
		return false;
	}

	const date = new Date(lastCheck);
	const start = new Date(timeRange.start);
	const end = addDays(new Date(timeRange.end), 1);

	return date >= start && date <= end;
}

export function getTimeRange(todo: Todo): TimeRange | undefined {
	if (todo.time?.type === "range") {
		return {
			start: todo.time.start,
			end: todo.time.end,
		};
	}

	if (todo.time?.type === "recurring") {
		const today = sanitizeDate(new Date());

		if (todo.time.mode === "daily") {
			return {
				start: toLocalDateString(today),
				end: toLocalDateString(today),
			};
		}

    if (todo.time.mode === "weekly") {
      //offset so monday is the start of the week
      const weekDay = (today.getDay() + 6) % 7;
      const weekStart = addDays(today, -weekDay);

      const start = new Date(weekStart);

      return {
				start: toLocalDateString(start),
				end: toLocalDateString(addDays(start, 6)),
			};
		}
	}

	return undefined;
}
