import { findRoute } from "@/router/define"
import { JSX, useState } from "react"
import { type RoutePath } from "./types"

export const AppRouter = () => {
	const [currentRoute, setCurrentRoute] = useState<RoutePath>("home")
	console.log(currentRoute)
	const Component = findRoute(currentRoute)?.component ?? ErrorComponent
	const navigate = (path: RoutePath) => {
		setCurrentRoute(path)
	}
	return <Component navigate={navigate} />
}

type RouteProps = {
	navigate: (path: RoutePath) => void
}
export type RouteComponent = (props: RouteProps) => JSX.Element

export const ErrorComponent = () => {
	return <div>Error</div>
}
