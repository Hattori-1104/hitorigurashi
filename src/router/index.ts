import { RouteComponent } from "@/router/component"
import { Route } from "./types"

export const createRoute = <Path extends string>(
	path: Path,
	component: RouteComponent,
): Route<Path> => {
	return {
		path,
		component,
	}
}
