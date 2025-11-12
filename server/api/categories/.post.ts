import { H3Error } from "h3";
import { Category } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (event, session): Promise<Category> => {
		const newCategory = await readValidatedBody<Category>(event, (data) => {
			return Category.parse(data);
		});

		const category = await Categories.updateOrAdd(session.userId, newCategory);
		if (category instanceof H3Error) throw category;

		CategorieEventStream.sendUpdate(session.userId);
		return category;
	},
);
