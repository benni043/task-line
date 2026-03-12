import { z } from "zod";

export type UUID = string;

const TimeRange = z.object({
	type: z.literal("range"),
	start: z.iso.date(),
	end: z.iso.date(),
});
export type TimeRange = Omit<z.infer<typeof TimeRange>, "type">;

const TimeRecurringMode = z.enum(["daily", "weekly"]);
const TimeRecurring = z.object({
	type: z.literal("recurring"),
	mode: TimeRecurringMode,
});
export type TimeRecurring = Omit<z.infer<typeof TimeRecurring>, "type">;

export const Time = z.discriminatedUnion("type", [TimeRange, TimeRecurring]);
export type Time = z.infer<typeof Time>;

export const Todo = z.object({
	uuid: z.uuid(),
	title: z.string().min(1),
	note: z.string(),
	time: Time.optional(),
	tags: z.array(z.uuid()),
	category: z.uuid().optional(),
	checks: z.array(z.iso.date()),
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
