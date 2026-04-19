import { useRouter } from "@/hooks/useRouter"
import { createRoute } from "@/router"

export const HomeRoute = createRoute("home", () => {
	const { navigate, currentRoute } = useRouter()
	return (
		<div>
			<div>current : {currentRoute}</div>
			<input
				type="button"
				value="Go to About"
				onClick={() => navigate("about")}
			/>
		</div>
	)
})
