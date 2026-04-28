import type { NuxtError } from "nuxt/app";
import { updateOrInsertAfterTodo } from "~~/shared/array";
import { toLocalDateString } from "~~/shared/date";
import type { Todo, UUID } from "~~/shared/types";

function getKey(userId: string): string {
	return `todos:${userId}`;
}

export const Todos = {
	async getAll(userId: string): Promise<Todo[]> {
		const storage = useStorage();
		return (await storage.get<Todo[]>(getKey(userId))) ?? [];
	},

	async sendMsg(): Promise<void> {
		const keys = await useStorage().getKeys();
		const filteredKeys = keys.filter((key) => key.startsWith("todos:"));

		filteredKeys.forEach(async (key) => {
			const todos = await useStorage().get<Todo[]>(key);

			todos?.forEach((todo) => {
				if (todo.time?.type === "point") {
					const date = new Date(todo.time.time);
					const now = new Date();

					const sameMinute =
						date.getUTCFullYear() === now.getUTCFullYear() &&
						date.getUTCMonth() === now.getUTCMonth() &&
						date.getUTCDate() === now.getUTCDate() &&
						date.getUTCHours() === now.getUTCHours() &&
						date.getUTCMinutes() === now.getUTCMinutes();

					if (sameMinute) {
						Subscriptions.sendNotification(
							key.substring(6),
							todo.title,
							todo.note,
						);
					}
				}
			});
		});
	},

	async getAllWithTimeStamp(userId: string): Promise<Todo[]> {
		const todos = await Todos.getAll(userId);

		return todos.filter((todo) => todo.time?.type === "range");
	},

	async move(
		userId: string,
		toMove: UUID,
		to: UUID,
	): Promise<undefined | NuxtError> {
		const storage = useStorage();
		const todos = await Todos.getAll(userId);

		const targetIndex = todos.findIndex((todo) => todo.uuid === to);
		const movedIndex = todos.findIndex((todo) => todo.uuid === toMove);

		if (targetIndex === -1 || movedIndex === -1)
			return createError({
				status: 404,
				statusMessage: "Not Found",
				message: `todo not found`,
			});

		const moved = todos.splice(movedIndex, 1)[0]!;
		todos.splice(targetIndex, 0, moved);

		await storage.set(getKey(userId), todos);
	},

	async updateOrAdd(
		userId: string,
		todo: Todo,
		position?: "top" | "bottom",
		previous?: UUID,
	): Promise<Todo | NuxtError> {
		const storage = useStorage();
		const todos = await Todos.getAll(userId);

		updateOrInsertAfterTodo(todos, todo, position ?? "top", previous);

		await storage.set(getKey(userId), todos);

		return todo;
	},

	async delete(userId: string, uuid: UUID): Promise<Todo | NuxtError> {
		const storage = useStorage();
		const todos = await Todos.getAll(userId);

		const index = todos.findIndex((value) => value.uuid === uuid);
		if (index === -1)
			return createError({
				status: 404,
				statusMessage: "Not Found",
				message: `Todo with with uuid ${uuid} not found`,
			});

		const todo = todos.splice(index, 1)[0]!;
		await storage.set(getKey(userId), todos);

		return todo;
	},

	async check(userId: string, uuid: UUID): Promise<Todo | NuxtError> {
		const storage = useStorage();
		const todos = await Todos.getAll(userId);

		const index = todos.findIndex((value) => value.uuid === uuid);
		if (index === -1)
			return createError({
				status: 404,
				statusMessage: "Not Found",
				message: `Todo with with uuid ${uuid} not found`,
			});

		const todo = todos[index]!;
		todo.checks.push(toLocalDateString(new Date()));
		await storage.set(getKey(userId), todos);

		return todo;
	},

	async uncheck(userId: string, uuid: UUID): Promise<Todo | NuxtError> {
		const storage = useStorage();
		const todos = await Todos.getAll(userId);

		const index = todos.findIndex((value) => value.uuid === uuid);
		if (index === -1)
			return createError({
				status: 404,
				statusMessage: "Not Found",
				message: `Todo with with uuid ${uuid} not found`,
			});

		const todo = todos[index]!;
		todo.checks.pop();
		await storage.set(getKey(userId), todos);

		return todo;
	},
};
