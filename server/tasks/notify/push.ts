export default defineTask({
	async run(_event) {
	  await Todos.sendMsg()

		const result = {
			sent: 10,
		};

		return { result };
	},
});
