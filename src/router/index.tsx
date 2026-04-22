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
const historyStack = new Stack<RoutePath>("home")

const useRouterStore = create<RouterState>(() => ({
	state: {
		type: "loading",
		loading: false,
		nextRoutePath: "home",
	},
}))

const getRouteFromPath = <Path extends RoutePath>(path: Path) =>
	routes.find((route) => route.path === path) as unknown as Route<
		Path,
		LoaderDataFromPath<Path>
	>

export const AppRouter = () => {
	const state = useRouterStore((s) => s.state)
	if (state.type === "idle") {
		const { Component } = getRouteFromPath(state.currentRouteInfo.path)
		return <Component loaderData={state.currentRouteInfo.loaderData} />
	}

	if (state.type === "loading") {
		if (state.currentRouteInfo) {
			const { Component } = getRouteFromPath(state.currentRouteInfo.path)
			return <Component loaderData={state.currentRouteInfo.loaderData} />
		}
		if (!state.loading) loadRoute(state.nextRoutePath)

		return <FallBack />
	}
}

const loadRoute = async (nextRoutePath: RoutePath) => {
	const { loader } = getRouteFromPath(nextRoutePath)

	if (!loader) {
		useRouterStore.setState(() => ({
			state: {
				type: "idle",
				currentRouteInfo: {
					path: nextRoutePath,
					loaderData: undefined,
				},
			},
		}))
		historyStack.push(nextRoutePath)
		return
	}
	useRouterStore.setState(() => ({
		state: { type: "loading", nextRoutePath, loading: true },
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
