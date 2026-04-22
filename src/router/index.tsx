import { create } from "zustand"
import { routes } from "@/routes/routes"
import { Stack } from "@/utils/stack"
import type { LoaderDataFromPath, Route, RoutePath } from "./types"

type CurrentRouteInfo<Path extends RoutePath> = {
	path: Path
	loaderData: LoaderDataFromPath<Path>
}

type RouterState = {
	currentRouteInfo: CurrentRouteInfo<RoutePath> | null
	state:
		| {
				type: "idle"
		  }
		| {
				type: "loading"
				loading: boolean
				nextRoutePath: RoutePath
		  }
}

// シングルトン
const historyStack = new Stack<RoutePath>("home")

const useRouterStore = create<RouterState>(() => ({
	currentRouteInfo: null,
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
	const currentRouteInfo = useRouterStore((state) => state.currentRouteInfo)
	const state = useRouterStore((state) => state.state)
	if (!currentRouteInfo) {
		if (state.type === "loading" && !state.loading) {
			state.loading = true
			const nextRoute = getRouteFromPath(state.nextRoutePath)
			const loader = async () => await nextRoute.loader()
			loader().then((loaderData) => {
				useRouterStore.setState(() => ({
					currentRouteInfo: {
						path: state.nextRoutePath,
						loaderData,
					},
					state: {
						type: "idle",
					},
				}))
			})
		}
		return <FallBack />
	}
	const { Component } = getRouteFromPath(currentRouteInfo.path)
	const loaderData = currentRouteInfo.loaderData
	return <Component loaderData={loaderData} />
}

const FallBack = () => {
	return <div>Loading...</div>
}
