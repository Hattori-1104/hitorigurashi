import type { RoutePath } from "@/router/types"
import { useState } from "react"

type History = {
	path: RoutePath
	id: string
}

export function useRouter() {
	const [history, setHistory] = useState<History[]>([
		{ path: "home", id: crypto.randomUUID() },
	])
	const currentRoute = history[history.length - 1].path
	const navigate = (path: RoutePath) => {
		setHistory((prev) => [...prev, { path, id: crypto.randomUUID() }])
	}
	return { currentRoute, history, navigate }
}
