import { getMigrations } from "better-auth/db/migration";

export default defineNitroPlugin(async () => {
	const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(
		auth.options,
	);

	// Check what migrations are needed
	console.log("Running Migrations");
	console.log("Tables to create:", toBeCreated);
	console.log("Fields to add:", toBeAdded);

	// Run migrations
	await runMigrations();
});
