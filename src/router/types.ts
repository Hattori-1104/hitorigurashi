import type { JSX } from "react"
import type { routes } from "./routes"

export type Route<path extends string> = {
	path: path
	component: RouteComponent
}
export type RoutePath = (typeof routes)[number]["path"]
export type RouteComponent = () => JSX.Element
