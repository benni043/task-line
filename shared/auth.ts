import jwt from "jsonwebtoken";
import type { JwtPayload } from "~~/shared/types";

export const Auth = {
	createRaw(
		id: string,
		email: string,
		picture: string,
		ttl: `${number}s`,
		secret: string,
	): string {
		return jwt.sign({ sub: id, email, picture } as JwtPayload, secret, {
			expiresIn: ttl,
		});
	},
};
