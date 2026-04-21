import { create, props } from "@stylexjs/stylex"
import { lightTheme } from "../styles/scheme.stylex"

const styles = create({
	base: {
		display: "flex",
		height: "100vh",
		width: "100vw",
		flexDirection: "column",
	},
	headerWrapper: {
		height: "calc(64px + env(safe-area-inset-top))",
		borderBottomWidth: "1px",
		borderBottomStyle: "solid",
		borderBottomColor: lightTheme.divider,
		backgroundColor: lightTheme.bgBright,
		paddingTop: "env(safe-area-inset-top)",
	},
	body: {
		flexGrow: 1,
		backgroundColor: lightTheme.bg,
	},
	navbarWrapper: {
		height: "calc(64px + env(safe-area-inset-bottom))",
		borderTopWidth: "1px",
		borderTopStyle: "solid",
		borderTopColor: lightTheme.divider,
		backgroundColor: lightTheme.bgBright,
		paddingBottom: "env(safe-area-inset-bottom)",
	},
})

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return <div {...props(styles.base)}>{children}</div>
}

export const LayoutHeader = ({ children }: { children: React.ReactNode }) => {
	return <header {...props(styles.headerWrapper)}>{children}</header>
}

export const LayoutBody = ({ children }: { children: React.ReactNode }) => {
	return <main {...props(styles.body)}>{children}</main>
}

export const LayoutNavbar = ({ children }: { children: React.ReactNode }) => {
	return <nav {...props(styles.navbarWrapper)}>{children}</nav>
}
