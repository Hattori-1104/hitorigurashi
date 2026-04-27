import { createFileRoute } from "@tanstack/react-router"
import { AppWindow } from "lucide-react"
import { effectCommand } from "@/commands/effect_command"
import { Header } from "@/components/Header"
import { Layout, LayoutBody } from "@/components/Layout"
import { Navbar } from "@/features/NavbarConfigured"
import { effectLoader } from "@/route_modules/loader"
import { commands } from "@/types/bindings"

export const Route = createFileRoute("/")({
	loader: () =>
		effectLoader(() => {
			return effectCommand(commands.getItems)()
		}),
	component: () => {
		const items = Route.useLoaderData()
		return (
			<Layout>
				<Header title="ホーム" />
				<LayoutBody>
					<div>
						<ul>
							{items.map((item) => (
								<li key={item.id}>
									{item.name} x{item.quantity}
								</li>
							))}
						</ul>
					</div>
				</LayoutBody>
				<Navbar />
			</Layout>
		)
	},
})
