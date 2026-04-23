import { useEffect } from "react"
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

export const routerStore = create<RouterState>(() => ({
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
