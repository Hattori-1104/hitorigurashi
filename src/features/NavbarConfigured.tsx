import { Home, Landmark } from "lucide-react"
import { Navbar as _Navbar, type NavigationItem } from "@/components/Navbar"

const items: NavigationItem[] = [
	{ label: "家計", Icon: Landmark, to: "/finance" },
	{ label: "ホーム", Icon: Home, to: "/" },
]

export const Navbar = () => {
	return <_Navbar items={items} />
}
