import { useState } from "react"
import {
	Layout,
	LayoutBody,
	LayoutHeader,
	LayoutNavbar,
} from "@/components/layout"
import { createRoute } from "@/router/create_route"
import { commands, type ShoppingItem } from "@/types/bindings"

export const HomeRoute = createRoute("home", {
	loader: (): Promise<string> => {
		return new Promise((resolve) => setTimeout(() => resolve("Hello"), 2000))
	},
	Component: ({ loaderData }) => {
		const [itemName, setItemName] = useState<ShoppingItem["name"]>("")
		const [items, setItems] = useState<ShoppingItem[]>([])

		const handleAddItem = async () => {
			await commands.addItem(itemName, 1)
			setItemName("")
			const res = await commands.getItems()
			if (res.status === "ok") {
				setItems(res.data)
			}
		}

		return (
			<Layout>
				<LayoutHeader>Home</LayoutHeader>
				<LayoutBody>
					<div>loaderData : {loaderData}</div>
					<input
						type="text"
						value={itemName}
						onChange={(e) => setItemName(e.target.value)}
					/>
					<input type="button" onClick={handleAddItem} value="Add Item" />
					<ul>
						{items.map((item) => (
							<li key={item.id}>
								{item.name} x {item.quantity}
							</li>
						))}
					</ul>
				</LayoutBody>
				<LayoutNavbar>
					<div>test</div>
				</LayoutNavbar>
			</Layout>
		)
	},
})
