import { useRouter } from "@/hooks/useRouter"
import { createRoute } from "@/router"

export const AboutRoute = createRoute("about", () => {
	const { navigate, currentRoute } = useRouter()
	return (
		<div>
			<div>current : {currentRoute}</div>
			<input
				type="button"
				value="Go to Home"
				onClick={() => navigate("home")}
			/>
		</div>
	)
})
