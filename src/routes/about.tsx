import {
	Layout,
	LayoutBody,
	LayoutHeader,
	LayoutNavbar,
} from "@/components/layout"
import { useNavigation } from "@/hooks/useNavigation"
import { createRoute } from "@/router/create_route"

export const AboutRoute = createRoute("about", {
	Component: () => {
		const { navigate } = useNavigation()
		return (
			<Layout>
				<LayoutHeader>About</LayoutHeader>
				<LayoutBody>
					<input
						type="button"
						value="To Home"
						onClick={() => navigate("home")}
					/>
					<div>test</div>
				</LayoutBody>
				<LayoutNavbar>
					<div>test</div>
				</LayoutNavbar>
			</Layout>
		)
	},
})
