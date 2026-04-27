import { createFileRoute } from "@tanstack/react-router"
import { Header } from "@/components/Header"
import { Layout, LayoutBody } from "@/components/Layout"
import { Navbar } from "@/features/NavbarConfigured"

export const Route = createFileRoute("/finance/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Layout>
			<Header title="家計" />
			<LayoutBody>hello "finance"</LayoutBody>
			<Navbar />
		</Layout>
	)
}
