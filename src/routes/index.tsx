import { createFileRoute } from "@tanstack/react-router"
import { effectCommand } from "@/commands/effect_command"
import { Header } from "@/components/Header"
import { Layout, LayoutBody, LayoutNavbar } from "@/components/Layout"
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
				<Header title="index" back />
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
				<LayoutNavbar>navbar</LayoutNavbar>
			</Layout>
		)
	},
})
