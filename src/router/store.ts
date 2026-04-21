import { create } from "zustand"
import type { Result } from "@/utils/result"
import type { RoutePath } from "./types"

type State = {
	historyStack: RoutePath[]
}

export const useHistory = create<State>(() => ({
	historyStack: ["home"],
}))

export const getCurrentRoute = (state: State) => {
	const h = state.historyStack
	return h[h.length - 1]
}

export const getHistoryStack = (state: State) => state.historyStack

const push = (route: RoutePath) =>
	useHistory.setState((state) => ({
		historyStack: [...state.historyStack, route],
	}))

const replace = (route: RoutePath) =>
	useHistory.setState((state) => ({
		historyStack: [...state.historyStack.slice(0, -1), route],
	}))

const back = (): Result<null, "top_route"> => {
	const state = useHistory.getState()
	if (state.historyStack.length <= 1) {
		return { success: false, id: "top_route" }
	}
	useHistory.setState((state) => ({
		historyStack: state.historyStack.slice(0, -1),
	}))
	return { success: true, value: null }
}

export const actions = {
	push,
	replace,
	back,
}
