import { H3Error } from "h3";
import { Category } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
	async (event, userId): Promise<Category> => {
		const newCategory = await readValidatedBody<Category>(event, (data) => {
			return Category.parse(data);
		});

		const category = await Categories.updateOrAdd(userId, newCategory);
		if (category instanceof H3Error) throw category;

		CategorieEventStream.sendUpdate(userId);
		return category;
	},
);
