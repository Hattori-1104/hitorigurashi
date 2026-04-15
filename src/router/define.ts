import { AboutRoute } from "@/route/about"
import { homeRoute as HomeRoute } from "@/route/home"
import { RoutePath } from "./types"

export const routes = [HomeRoute, AboutRoute]

export const findRoute = (path: RoutePath) =>
	routes.find((route) => route.path === path)
