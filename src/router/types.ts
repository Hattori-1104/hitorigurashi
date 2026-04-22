import type { JSX } from "react"
import type { routes } from "../routes/routes"

export type Route<Path extends string, LoaderData> = {
	path: Path
	Component: RouteComponent<LoaderData>
	loader?: () => Promise<LoaderData> | LoaderData
}
export type RouteUnion = (typeof routes)[number]
export type RoutePath = RouteUnion["path"]

export type RouteComponent<LoaderData> = (props: {
	loaderData: LoaderData
}) => JSX.Element

export type LoaderDataFromPath<Path extends RoutePath> =
	RouteUnion extends infer T
		? T extends Route<Path, infer U>
			? U
			: never
		: never
