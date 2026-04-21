import {
	Layout,
	LayoutBody,
	LayoutHeader,
	LayoutNavbar,
} from "@/components/layout"
import { useRouter } from "@/hooks/useRouter"
import { createRoute } from "@/router"
import { commands, ShoppingItem } from "@/types/bindings"
import { useState } from "react"

export const HomeRoute = createRoute("home", () => {
	const { navigate, currentRoute } = useRouter()
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
				<div>current : {currentRoute}</div>
				<input
					type="button"
					value="Go to About"
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
})
