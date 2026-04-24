import { useRouterStore } from "@/router/store"
import type { RoutePath } from "@/router/types"

export const useNavigation = () => {
	const navigate = (to: RoutePath) => {
		useRouterStore.setState((s) => ({
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
