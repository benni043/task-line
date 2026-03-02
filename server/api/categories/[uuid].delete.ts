import type { Category, UUID } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (event, userId): Promise<Category> => {
		const uuid: UUID | undefined = getRouterParam(event, "uuid");

		if (!uuid)
			throw createError({
				status: 400,
				statusMessage: "Bad Request",
				message: `no uuid set - uuid:'${uuid}'`,
			});

		const category = await Categories.delete(userId, uuid);
		if (category instanceof Error) throw category;

		CategorieEventStream.sendUpdate(userId);
		return category;
	},
);
