import type { Todo, UUID } from "./types";

export function updateOrInsertAfterTodo(
  data: Todo[],
  insert: Todo,
  previous?: UUID,
): Todo[] {
  const index = data.findIndex((value) => value.uuid === insert.uuid);
  const previousIndex = previous
    ? data.findIndex((value) => value.uuid === previous)
    : undefined;

  if (index === -1) {
    if (previousIndex !== undefined) {
      data.splice(previousIndex + 1, 0, insert);
    } else {
      data.push(insert);
    }
  } else {
    data[index] = insert;
  }

  return data;
}
