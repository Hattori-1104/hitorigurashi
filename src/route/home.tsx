import { createRoute } from "@/router"

export const homeRoute = createRoute("home", ({navigate}) => {
	return <div>
		<input type="button" value="Go to About" onClick={() => navigate("about")} />
	</div>
})
