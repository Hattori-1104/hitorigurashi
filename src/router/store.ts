import { create } from "zustand"
import { Stack } from "@/utils/stack"
import type { LoaderDataFromPath, RoutePath } from "./types"

type CurrentRouteInfo<Path extends RoutePath> = {
	path: Path
	loaderData: LoaderDataFromPath<Path>
}

export type RouterState = {
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
