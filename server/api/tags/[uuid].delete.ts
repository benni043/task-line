import type { Label, UUID } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (event, userId): Promise<Label> => {
		const uuid: UUID | undefined = getRouterParam(event, "uuid");

		if (!uuid)
			throw createError({
				status: 400,
				statusMessage: "Bad Request",
				message: `no uuid set - uuid:'${uuid}'`,
			});

		const tag = await Tags.delete(userId, uuid);
		if (tag instanceof Error) throw tag;

		TagEventStream.sendUpdate(userId);
		return tag;
	},
);
