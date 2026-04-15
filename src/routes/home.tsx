import { useRouter } from "@/hooks/useRouter"
import { createRoute } from "@/router"

export const HomeRoute = createRoute("home", () => {
	const { navigate, history } = useRouter()
	return (
		<div>
			<input
				type="button"
				value="Go to About"
				onClick={() => navigate("about")}
			/>
			<div>
				{history.map((h) => (
					<div key={h.id}>{h.path}</div>
				))}
			</div>
		</div>
	)
})
