import { useState } from "react"
import {
	Layout,
	LayoutBody,
	LayoutHeader,
	LayoutNavbar,
} from "@/components/layout"
import { useNavigation } from "@/hooks/useNavigation"
import { createRoute } from "@/router/create"
import { commands, type ShoppingItem } from "@/types/bindings"

export const HomeRoute = createRoute("home", {
	loader: async () => {
		const res = await commands.getItems()
		if (res.status === "ok") return { items: res.data }
		else throw Error("commandが動かない")
	},
	Component: ({ loaderData }) => {
		const [itemName, setItemName] = useState<ShoppingItem["name"]>("")
		const [items, setItems] = useState<ShoppingItem[]>(loaderData.items)
		const { navigate } = useNavigation()

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
					<input
						type="button"
						value="To About"
						onClick={() => navigate("about")}
					/>
					<input
						type="text"
						value={itemName}
						onChange={(e) => setItemName(e.target.value)}
					/>
					<input type="button" onClick={handleAddItem} value="Add Item" />
					<ul>
						{items.map((item) => (
							<li key={item.id}>
								{item.name} x{item.quantity}
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
