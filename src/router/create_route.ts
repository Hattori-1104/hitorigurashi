import type { Route, RouteComponent } from "./types"

export const createRoute = <Path extends string, LoaderData>(
	path: Path,
	loader: () => Promise<LoaderData> | LoaderData,
	Component: RouteComponent<LoaderData>,
): Route<Path, LoaderData> => {
	return {
		path,
		loader,
		Component,
	}
}
