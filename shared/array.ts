import type { Todo, UUID } from "./types";

export function updateOrInsertAfterTodo(
	data: Todo[],
	insert: Todo,
	position: "top" | "bottom",
	previous?: UUID,
): Todo[] {
	const index = data.findIndex((value) => value.uuid === insert.uuid);
	const previousIndex = previous
		? data.findIndex((value) => value.uuid === previous)
		: undefined;

	if (index === -1) {
		if (previousIndex !== undefined) {
			const offset = position === "top" ? 0 : 1;
			data.splice(previousIndex + offset, 0, insert);
		} else {
			if (position === "top") {
				data.unshift(insert);
			} else {
				data.push(insert);
			}
		}
	} else {
		data[index] = insert;
	}

	return data;
}
