import {
	Layout,
	LayoutBody,
	LayoutHeader,
	LayoutNavbar,
} from "@/components/layout"
import { createRoute } from "@/router/create_route"

export const AboutRoute = createRoute(
	"about",
	() => {},
	() => {
		return (
			<Layout>
				<LayoutHeader>About</LayoutHeader>
				<LayoutBody>
					<div>test</div>
				</LayoutBody>
				<LayoutNavbar>
					<div>test</div>
				</LayoutNavbar>
			</Layout>
		)
	},
)
