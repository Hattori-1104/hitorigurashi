import type { Route, RouteComponent } from "./types"

export const createRoute = <Path extends string, LoaderData = undefined>(
	path: Path,
	args: {
		Component: RouteComponent<LoaderData>
		loader?: () => LoaderData | Promise<LoaderData>
	},
): Route<Path, LoaderData> => {
	return {
		path,
		Component: args.Component,
		loader: args.loader,
	}
}
