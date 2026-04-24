import { useRouterStore } from "@/router/store"

export const useIsLoading = () => {
	const isLoading = useRouterStore((s) =>
		s.state.type === "loading" ? s.state.loading : false,
	)
	return { isLoading }
}
