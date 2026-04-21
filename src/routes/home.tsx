import {
	Layout,
	LayoutBody,
	LayoutHeader,
	LayoutNavbar,
} from "@/components/layout"
import { useRouter } from "@/hooks/useRouter"
import { createRoute } from "@/router"

export const HomeRoute = createRoute("home", () => {
	const { navigate, currentRoute } = useRouter()
	return (
		<Layout>
			<LayoutHeader>Home</LayoutHeader>
			<LayoutBody>
				<div>current : {currentRoute}</div>
				<input
					type="button"
					value="Go to About"
					onClick={() => navigate("about")}
				/>
			</LayoutBody>
			<LayoutNavbar>
				<div>test</div>
			</LayoutNavbar>
		</Layout>
	)
})
