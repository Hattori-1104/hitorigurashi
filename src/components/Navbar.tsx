import * as stylex from "@stylexjs/stylex"
import { Link, type LinkProps, useRouterState } from "@tanstack/react-router"
import type { LucideIcon } from "lucide-react"
import { lightTheme } from "../styles/scheme.stylex"

const s = stylex.create({
	base: {
		height: "calc(4rem + env(safe-area-inset-bottom))",
		borderTopWidth: "1px",
		borderTopStyle: "solid",
		borderTopColor: lightTheme.divider,
		backgroundColor: lightTheme.bgBright,
		paddingBottom: "env(safe-area-inset-bottom)",
		flexShrink: "0",
		display: "flex",
		flexDirection: "row",
	},
	item: {
		height: "100%",
		flexGrow: "1",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		color: lightTheme.sub,
		textDecoration: "none",
		fontSize: "0.75rem",
		transitionDuration: "1s",
		transitionProperty: "color",
		gap: "0.25rem",
	},
	active: {
		color: lightTheme.main,
	},
})

export type NavigationItem = {
	label: string
	Icon: LucideIcon
	to: LinkProps["to"]
}

type NavItemProps = {
	item: NavigationItem
}

const NavItem = ({ item }: NavItemProps) => {
	const isActive = useRouterState({
		select: (s) => s.location.pathname === item.to,
	})
	return (
		<Link {...stylex.props(s.item, isActive && s.active)} to={item.to}>
			<item.Icon size={24} />
			<span>{item.label}</span>
		</Link>
	)
}

type Props = {
	items: NavigationItem[]
}

export const Navbar = ({ items }: Props) => {
	return (
		<nav {...stylex.props(s.base)}>
			{items.map((item) => (
				<NavItem key={item.to} item={item} />
			))}
		</nav>
	)
}
