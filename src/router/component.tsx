import { useRouter } from "@/hooks/useRouter"
import { routes } from "./routes"
import type { Route, RoutePath } from "./types"

const findRoute = <Path extends RoutePath>(path: Path) =>
	routes.find((route) => route.path === path) as Route<Path>

export const AppRouter = () => {
	const { currentRoute } = useRouter()
	console.log(currentRoute)
	const Component = findRoute(currentRoute).component
	return <Component />
}

export const ErrorComponent = () => {
	return <div>Error</div>
}
