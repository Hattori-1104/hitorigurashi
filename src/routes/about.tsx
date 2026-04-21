import {
	Layout,
	LayoutBody,
	LayoutHeader,
	LayoutNavbar,
} from "@/components/layout"
import { useRouter } from "@/hooks/useRouter"
import { createRoute } from "@/router"

export const AboutRoute = createRoute("about", () => {
	const { navigate, currentRoute } = useRouter()
	return (
		<Layout>
			<LayoutHeader>About</LayoutHeader>
			<LayoutBody>
				<div>current : {currentRoute}</div>
				<input
					type="button"
					value="Go to Home"
					onClick={() => navigate("home")}
				/>
			</LayoutBody>
			<LayoutNavbar>
				<div>test</div>
			</LayoutNavbar>
		</Layout>
	)
})
