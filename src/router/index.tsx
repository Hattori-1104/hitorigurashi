import { useEffect } from "react"
import { historyStack, routerStore } from "./store"
import type { RoutePath } from "./types"
import { getRouteFromPath } from "./utils"

export const AppRouter = () => {
	const nextPath = routerStore((s) =>
		s.state.type === "loading" ? s.state.nextRoutePath : null,
	)
	const isLoading = routerStore((s) =>
		s.state.type === "loading" ? s.state.loading : null,
	)

	useEffect(() => {
		if (nextPath && !isLoading) {
			loadRoute(nextPath)
		}
	}, [nextPath, isLoading])

	const currentInfo = routerStore((s) => s.state.currentRouteInfo)

	if (currentInfo) {
		const currentRoute = getRouteFromPath(currentInfo.path)
		return <currentRoute.Component loaderData={currentInfo.loaderData} />
	}
	return <FallBack />
}

// "非同期"にrouterStoreを変更
const loadRoute = async (nextRoutePath: RoutePath) => {
	const { loader } = getRouteFromPath(nextRoutePath)

	// 即座に遷移
	if (!loader) {
		routerStore.setState({
			state: {
				type: "idle",
				currentRouteInfo: {
					path: nextRoutePath,
					loaderData: undefined,
				},
			},
		})
		historyStack.push(nextRoutePath)
		return
	}

	// Loaderを待機して遷移
	routerStore.setState((s) => ({
		state: {
			currentRouteInfo: s.state.currentRouteInfo,
			type: "loading",
			nextRoutePath,
			loading: true,
		},
	}))

	const loaderData = await loader()

	historyStack.push(nextRoutePath)
	routerStore.setState(() => ({
		state: {
			type: "idle",
			currentRouteInfo: {
				path: nextRoutePath,
				loaderData,
			},
		},
	}))
}

const FallBack = () => {
	return <div>Loading...</div>
}
