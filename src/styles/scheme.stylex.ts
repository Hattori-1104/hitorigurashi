import { defineVars } from "@stylexjs/stylex"
import { blue, rose, slate } from "./colors.stylex"

export const lightTheme = defineVars({
	bg: slate[50],
	bgBright: "white",
	divider: slate[300],
	main: slate[800],
	sub: slate[400],
	placeholder: slate[400],
	primary: blue[500],
	primarySub: blue[200],
	secondary: rose[500],
	secondarySub: rose[200],
})
