import type { RouteComponent } from "@/router/component"
import type { routes } from "@/router/define"

export type Route<path extends string> = {
	path: path
	component: RouteComponent
}

export type RoutePath = (typeof routes)[number]["path"]
