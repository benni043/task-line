export default defineTask({
  async run(event) {
    console.log("Task running");

    const result = {
      sent: 10,
    };

    return { result };
  },
});
