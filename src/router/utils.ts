import { routes } from "@/routes/routes"
import type { LoaderDataFromPath, Route, RoutePath } from "./types"

export const getRouteFromPath = <Path extends RoutePath>(path: Path) =>
	routes.find((route) => route.path === path) as unknown as Route<
		Path,
		LoaderDataFromPath<Path>
	>
