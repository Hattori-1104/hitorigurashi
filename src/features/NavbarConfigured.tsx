import { Home } from "lucide-react"
import { Navbar as _Navbar, type NavigationItem } from "@/components/Navbar"

const items: NavigationItem[] = [{ label: "Index", Icon: Home, to: "/" }]

export const Navbar = () => {
	return <_Navbar items={items} />
}
