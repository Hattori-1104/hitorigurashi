import { createFileRoute } from "@tanstack/react-router"
import { effectCommand } from "@/commands/effect_command"
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
			<div>
				<ul>
					{items.map((item) => (
						<li key={item.id}>
							{item.name} x{item.quantity}
						</li>
					))}
				</ul>
			</div>
		)
	},
})
