import fsDriver from "unstorage/drivers/fs";
import memoryDriver from "unstorage/drivers/memory";
import upstashDriver from "unstorage/drivers/upstash";

export default defineNitroPlugin(() => {
	let env = useRuntimeConfig().NUXT_ENV;
	if (env === undefined || env === "") {
		env = process.env.NODE_ENV ?? "";
	}

	switch (env) {
		case "production":
			defineProductionStorage();
			break;
		case "development":
			defineDevelopmentStorage();
			break;
		case "test":
			defineTestStorage();
			break;
		default:
			throw new Error(`Unknown environment ${env}`);
	}
});

function defineTestStorage() {
	const storage = useStorage();

	storage.mount("todos", memoryDriver());
	storage.mount("tags", memoryDriver());
	storage.mount("categories", memoryDriver());
}

function defineDevelopmentStorage() {
	const storage = useStorage();

	storage.mount(
		"todos",
		fsDriver({
			base: "storage/todos",
		}),
	);
	storage.mount(
		"tags",
		fsDriver({
			base: "storage/tags",
		}),
	);
	storage.mount(
		"categories",
		fsDriver({
			base: "storage/categories",
		}),
	);
}

function defineProductionStorage() {
	const storage = useStorage();

	storage.mount(
		"todos",
		upstashDriver({
			url: useRuntimeConfig().upstash.url,
			token: useRuntimeConfig().upstash.token,
			base: "todos",
		}),
	);
	storage.mount(
		"tags",
		upstashDriver({
			url: useRuntimeConfig().upstash.url,
			token: useRuntimeConfig().upstash.token,
			base: "tags",
		}),
	);
	storage.mount(
		"categories",
		upstashDriver({
			url: useRuntimeConfig().upstash.url,
			token: useRuntimeConfig().upstash.token,
			base: "categories",
		}),
	);
}
