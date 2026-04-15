import { useState } from "react"
import { routes } from "./routes"
import type { RoutePath } from "./types"

const findRoute = (path: RoutePath) =>
	routes.find((route) => route.path === path)

export const AppRouter = () => {
	const [currentRoute, setCurrentRoute] = useState<RoutePath>("home")
	console.log(currentRoute)
	const Component = findRoute(currentRoute)?.component ?? ErrorComponent
	const navigate = (path: RoutePath) => {
		setCurrentRoute(path)
	}
	return <Component navigate={navigate} />
}

export const ErrorComponent = () => {
	return <div>Error</div>
}
