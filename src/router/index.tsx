import { useEffect } from "react"
import { historyStack, useRouterStore } from "./store"
import type { RoutePath } from "./types"
import { getRouteFromPath } from "./utils"

const usePageLoader = () =>
	useRouterStore((s) => {
		if (s.state.type === "loading") {
			if (!s.state.loading) {
				return {
					shouldStartReloading: true as const,
					nextRoutePath: s.state.nextRoutePath,
				}
			}
		}
		return { shouldStartReloading: false as const }
	})

export const AppRouter = () => {
	const pageLoaderState = usePageLoader()

	useEffect(() => {
		if (pageLoaderState.shouldStartReloading)
			loadRoute(pageLoaderState.nextRoutePath)
	}, [pageLoaderState])

	const currentInfo = useRouterStore((s) => s.state.currentRouteInfo)

	if (currentInfo) {
		const currentRoute = getRouteFromPath(currentInfo.path)
		return <currentRoute.Component loaderData={currentInfo.loaderData} />
	}
	return <FallBack />
}

// "非同期"にrouterStoreを変更
// ここから

const loadRoute = async (nextRoutePath: RoutePath) => {
	const { loader } = getRouteFromPath(nextRoutePath)

	// 即座に遷移
	if (!loader) {
		useRouterStore.setState({
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
	useRouterStore.setState((s) => ({
		state: {
			currentRouteInfo: s.state.currentRouteInfo,
			type: "loading",
			nextRoutePath,
			loading: true,
		},
	}))

	const loaderData = await loader()

	historyStack.push(nextRoutePath)
	useRouterStore.setState(() => ({
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
