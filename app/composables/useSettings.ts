type Settings = {
	insertionPoint: "top" | "bottom";
};

export function useSettings() {
	const settings = useLocalStorage<Settings>("settings", {
		insertionPoint: "bottom",
	});
	return { settings };
}
