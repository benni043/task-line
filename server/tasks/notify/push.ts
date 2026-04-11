export default defineTask({
	async run(_event) {
		console.log("Task running");

		const result = {
			sent: 10,
		};

		return { result };
	},
});
