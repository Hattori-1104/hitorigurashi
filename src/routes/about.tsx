import { useRouter } from "@/hooks/useRouter"
import { createRoute } from "@/router"

export const AboutRoute = createRoute("about", () => {
	const { navigate, history } = useRouter()
	return (
		<div>
			<input
				type="button"
				value="Go to Home"
				onClick={() => navigate("home")}
			/>
			<div>
				{history.map((h) => (
					<div key={h.id}>{h.path}</div>
				))}
			</div>
		</div>
	)
})
