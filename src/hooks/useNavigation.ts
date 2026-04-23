import { routerStore } from "@/router"
import type { RoutePath } from "@/router/types"

export const useNavigation = () => {
	const navigate = (to: RoutePath) => {
		routerStore.setState((s) => ({
			state: {
				type: "loading",
				currentRouteInfo: s.state.currentRouteInfo,
				loading: false,
				nextRoutePath: to,
			},
		}))
	}
	return { navigate }
}
