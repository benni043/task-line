import { z } from "zod";

export type UUID = string;

const TimeRange = z.object({
	type: z.literal("range"),
	start: z.iso.date(),
	end: z.iso.date(),
});
export type TimeRange = Omit<z.infer<typeof TimeRange>, "type">;

const TimePoint = z.object({
	type: z.literal("point"),
	time: z.iso.datetime(),
});
export type TimePoint = Omit<z.infer<typeof TimePoint>, "type">;

const TimeRecurringDaily = z.object({
	type: z.literal("recurring"),
	mode: z.literal("daily"),
});

const TimeRecurringWeekly = z.object({
	type: z.literal("recurring"),
	mode: z.literal("weekly"),
	start: z.number().optional(),
	end: z.number().optional(),
});

const TimeRecurring = z.discriminatedUnion("mode", [
	TimeRecurringDaily,
	TimeRecurringWeekly,
]);

export type TimeRecurring =
	| Omit<z.infer<typeof TimeRecurringDaily>, "type">
	| Omit<z.infer<typeof TimeRecurringWeekly>, "type">;

export const Time = z.discriminatedUnion("type", [
	TimeRange,
	TimePoint,
	TimeRecurring,
]);
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
