import { useRouter } from "@/hooks/useRouter"
import { routes } from "./routes"
import type { RoutePath } from "./types"

const findRoute = (path: RoutePath) =>
	routes.find((route) => route.path === path)

export const AppRouter = () => {
	const { currentRoute } = useRouter()
	const Component = findRoute(currentRoute)?.component ?? ErrorComponent
	return <Component />
}

export const ErrorComponent = () => {
	return <div>Error</div>
}
