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
})

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return <div {...stylex.props(styles.base)}>{children}</div>
}

export const LayoutBody = ({ children }: { children: React.ReactNode }) => {
	return <main {...stylex.props(styles.body)}>{children}</main>
}
