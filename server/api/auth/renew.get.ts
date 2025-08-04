import type { JwtToken } from "#shared/types";
import { Auth } from "#shared/auth";

export default defineAuthenticatedEventHandler(
  async (event, token): Promise<JwtToken> => {
    const newToken = Auth.create(token.sub, token.email, token.picture);

    return { token: newToken };
  },
);
