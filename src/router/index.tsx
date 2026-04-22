import { create } from "zustand"
import { routes } from "@/routes/routes"
import { Stack } from "@/utils/stack"
import type { LoaderDataFromPath, Route, RoutePath } from "./types"

type CurrentRouteInfo<Path extends RoutePath> = {
	path: Path
	loaderData: LoaderDataFromPath<Path>
}

type RouterState = {
	state:
		| {
				type: "idle"
				currentRouteInfo: CurrentRouteInfo<RoutePath>
		  }
		| {
				type: "loading"
				loading: boolean
				currentRouteInfo?: CurrentRouteInfo<RoutePath>
				nextRoutePath: RoutePath
		  }
}

// シングルトン
export const historyStack = new Stack<RoutePath>("home")

export const useRouterStore = create<RouterState>(() => ({
	state: {
		type: "loading",
		loading: false,
		nextRoutePath: "home",
	},
}))

export const getRouteFromPath = <Path extends RoutePath>(path: Path) =>
	routes.find((route) => route.path === path) as unknown as Route<
		Path,
		LoaderDataFromPath<Path>
	>

export const AppRouter = () => {
	const state = useRouterStore((s) => s.state)
	console.log("Router Rendering")
	console.log(`current : ${state.currentRouteInfo?.path}`)
	if (state.type === "idle") {
		const { Component } = getRouteFromPath(state.currentRouteInfo.path)
		return <Component loaderData={state.currentRouteInfo.loaderData} />
	}

	if (state.type === "loading") {
		if (!state.loading) loadRoute(state.nextRoutePath)
		if (state.currentRouteInfo) {
			const { Component } = getRouteFromPath(state.currentRouteInfo.path)
			return <Component loaderData={state.currentRouteInfo.loaderData} />
		}

		return <FallBack />
	}
}

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
