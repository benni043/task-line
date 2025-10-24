export function useLoginToken() {
	const runtimeConfig = useRuntimeConfig();

	return useCookie<string | undefined>("token", {
		maxAge: parseInt(runtimeConfig.public.jwtTTL, 10),
		sameSite: true,
	});
}
