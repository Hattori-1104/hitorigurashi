import {
	actions,
	getCurrentRoute,
	getHistoryStack,
	useHistory,
} from "@/router/store"

export function useRouter() {
	const navigate = actions.push
	const replace = actions.replace
	const back = actions.back
	const currentRoute = useHistory(getCurrentRoute)
	const historyStack = useHistory(getHistoryStack)

	return { navigate, replace, back, currentRoute, historyStack }
}
