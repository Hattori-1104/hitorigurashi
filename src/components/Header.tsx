import * as stylex from "@stylexjs/stylex"
import { ChevronLeft } from "lucide-react"
import { lightTheme } from "../styles/scheme.stylex"

const s = stylex.create({
	wrapper: {
		height: "calc(3rem + env(safe-area-inset-top))",
		borderBottomWidth: "1px",
		borderBottomStyle: "solid",
		borderBottomColor: lightTheme.divider,
		backgroundColor: lightTheme.bgBright,
		paddingTop: "env(safe-area-inset-top)",
		flexShrink: "0",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		paddingInline: "0.5rem",
		gap: "0.5rem",
	},
	side: {
		width: "2rem",
		height: "2rem",
	},
	title: {
		textAlign: "center",
		flexGrow: "1",
		fontWeight: "600",
	},
	backButton: {
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		borderWidth: "0px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		color: lightTheme.primary,
	},
})

type Props = {
	title: string
	back?: boolean
}

export const Header = ({ title, back }: Props) => {
	return (
		<header {...stylex.props(s.wrapper)}>
			<div {...stylex.props(s.side)}>
				{back && (
					<button {...stylex.props(s.backButton)} type="button">
						<ChevronLeft size="20" />
					</button>
				)}
			</div>
			<span {...stylex.props(s.title)}>{title}</span>
			<div {...stylex.props(s.side)} />
		</header>
	)
}
