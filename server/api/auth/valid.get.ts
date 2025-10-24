import { H3Error } from "h3";
import type { JwtValidation } from "#shared/types";

export default defineEventHandler(async (event): Promise<JwtValidation> => {
	const jwt = AuthApi.get(event);

	if (jwt instanceof H3Error) {
		throw jwt;
	}

	return {
		success: !!jwt,
	};
});
