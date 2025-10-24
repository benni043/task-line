export function useWeekDays(start: Date) {
	const { locale } = useI18n();

	const dayStrings = [];
	let now = start;

	for (let i = 0; i < 7; i++) {
		dayStrings.push({
			text: now
				.toLocaleString(locale.value, { weekday: "long" })
				.substring(0, 2),
			date: now,
		});

		// Increment the date by one day
		now = addDays(now, 1);
	}

	return dayStrings;
}
