import { z } from "zod";

export type UUID = string;

export const TimeframeSchema = z.object({
	start: z.iso.date(),
	end: z.iso.date(),
});
export type Timeframe = z.infer<typeof TimeframeSchema>;

export const Todo = z.object({
	uuid: z.uuid(),
	title: z.string().min(1),
	note: z.string(),
	timeframe: TimeframeSchema.optional(),
	tags: z.array(z.uuid()),
	category: z.uuid().optional(),
});
export type Todo = z.infer<typeof Todo>;
export type TodoData = Omit<Todo, "uuid">;

export const Label = z.object({
	uuid: z.uuid(),
	name: z.string().min(1),
	color: z.string().startsWith("#").length(7),
});
export type Label = z.infer<typeof Label>;

export const Category = Label.extend({
	icon: z.string(),
});
export type Category = z.infer<typeof Category>;

export type JwtValidation = {
	success: boolean;
};

export type JwtPayload = {
	sub: string;
	email: string;
	picture: string;
};

export type JwtToken = {
	token: string;
};
