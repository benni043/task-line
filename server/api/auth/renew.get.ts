import type { JwtToken } from "#shared/types";

export default defineAuthenticatedEventHandler(
  async (event, token): Promise<JwtToken> => {
    const newToken = AuthApi.create(token.sub, token.email, token.picture);

    return { token: newToken };
  },
);
