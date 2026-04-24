import { useEffect } from "react"
import { useShallow } from "zustand/shallow"
import { historyStack, useRouterStore } from "./store"
import type { LoaderDataFromPath, RoutePath } from "./types"
import { getRouteFromPath } from "./utils"

const usePageLoader = () =>
	useRouterStore(
		useShallow((s) => {
			if (s.state.type === "loading") {
				if (!s.state.loading) {
					return {
						shouldStartLoading: true,
						nextRoutePath: s.state.nextRoutePath,
					} as const
				}
			}
			return { shouldStartLoading: false } as const
		}),
	)

export const AppRouter = () => {
	const { shouldStartLoading, nextRoutePath } = usePageLoader()

	useEffect(() => {
		if (shouldStartLoading) loadRoute(nextRoutePath)
	}, [shouldStartLoading, nextRoutePath])

	const currentInfo = useRouterStore((s) => s.state.currentRouteInfo)

	if (currentInfo) {
		const currentRoute = getRouteFromPath(currentInfo.path)
		return <currentRoute.Component loaderData={currentInfo.loaderData} />
	}
	return <FallBack />
}

// "非同期"にrouterStoreを変更

const loadRouteWithOutLoader = (nextRoutePath: RoutePath) =>
	useRouterStore.setState({
		state: {
			type: "idle",
			currentRouteInfo: {
				path: nextRoutePath,
				loaderData: undefined,
			},
		},
	})

const startLoadRoute = (nextRoutePath: RoutePath) =>
	useRouterStore.setState((s) => ({
		state: {
			type: "loading",
			nextRoutePath,
			currentRouteInfo: s.state.currentRouteInfo,
			loading: true,
		},
	}))

const loadRouteWithLoaderData = <Next extends RoutePath>(
	nextRoutePath: Next,
	loaderData: LoaderDataFromPath<Next>,
) =>
	useRouterStore.setState({
		state: {
			type: "idle",
			currentRouteInfo: {
				path: nextRoutePath,
				loaderData,
			},
		},
	})

const loadRoute = async (nextRoutePath: RoutePath) => {
	const { loader } = getRouteFromPath(nextRoutePath)

	// 即座に遷移
	if (!loader) {
		loadRouteWithOutLoader(nextRoutePath)
		historyStack.push(nextRoutePath)
		return
	}

	// Loaderを待機して遷移
	startLoadRoute(nextRoutePath)
	const loaderData = await loader()
	loadRouteWithLoaderData(nextRoutePath, loaderData)
	historyStack.push(nextRoutePath)
}

const FallBack = () => {
	return <div>Loading...</div>
}
