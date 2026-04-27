import * as stylex from "@stylexjs/stylex"
import { lightTheme } from "../styles/scheme.stylex"

const styles = stylex.create({
	base: {
		display: "flex",
		height: "100vh",
		width: "100vw",
		flexDirection: "column",
	},
	body: {
		flexGrow: "1",
		minHeight: "0",
		overflowY: "scroll",
		backgroundColor: lightTheme.bg,
	},
	navbarWrapper: {
		height: "calc(4rem + env(safe-area-inset-bottom))",
		borderTopWidth: "1px",
		borderTopStyle: "solid",
		borderTopColor: lightTheme.divider,
		backgroundColor: lightTheme.bgBright,
		paddingBottom: "env(safe-area-inset-bottom)",
		flexShrink: "0",
	},
})

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return <div {...stylex.props(styles.base)}>{children}</div>
}

export const LayoutBody = ({ children }: { children: React.ReactNode }) => {
	return <main {...stylex.props(styles.body)}>{children}</main>
}

export const LayoutNavbar = ({ children }: { children: React.ReactNode }) => {
	return <nav {...stylex.props(styles.navbarWrapper)}>{children}</nav>
}
