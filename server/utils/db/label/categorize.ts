import type { H3Error } from "h3";
import type { Category, UUID } from "~~/shared/types";
import { Labels } from "./labels";

function getKey(userId: string): string {
	return `categories:${userId}`;
}

export const Categories = {
	async getAll(userId: string): Promise<Category[]> {
		return Labels.getAll(userId, getKey);
	},
	async updateOrAdd(
		userId: string,
		category: Category,
	): Promise<Category | H3Error> {
		return Labels.updateOrAdd(userId, category, getKey);
	},
	async delete(userId: string, uuid: UUID): Promise<Category | H3Error> {
		return Labels.delete(userId, uuid, getKey);
	},
};
