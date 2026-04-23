import { routerStore } from "@/router/store"

export const useIsLoading = () => {
	const isLoading = routerStore((s) =>
		s.state.type === "loading" ? s.state.loading : false,
	)
	return { isLoading }
}
