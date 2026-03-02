import { Label } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (event, userId): Promise<Label> => {
		const newTag = await readValidatedBody<Label>(event, (data) => {
			return Label.parse(data);
		});

		const tag = await Tags.updateOrAdd(userId, newTag);
		if (tag instanceof Error) throw tag;

		TagEventStream.sendUpdate(userId);
		return tag;
	},
);
