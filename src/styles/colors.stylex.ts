import { defineVars } from "@stylexjs/stylex"

interface Color {
	50: string
	100: string
	200: string
	300: string
	400: string
	500: string
	600: string
	700: string
	800: string
	900: string
	950: string
}

export const blue = defineVars({
	50: "oklch(.97 .014 254.604)",
	100: "oklch(.882 .059 254.128)",
	200: "oklch(.882 .059 254.128)",
	300: "oklch(.707 .165 254.624)",
	400: "oklch(.707 .165 254.624)",
	500: "oklch(.623 .214 259.815)",
	600: "oklch(.546 .245 262.881)",
	700: "oklch(.488 .243 264.376)",
	800: "oklch(.424 .199 265.638)",
	900: "oklch(.379 .146 265.522)",
	950: "oklch(.282 .091 267.935)",
} as const satisfies Color)

export const rose = defineVars({
	50: "#fff1f2",
	100: "#ffe4e6",
	200: "#ffccd3",
	300: "#ff637e",
	400: "#ff637e",
	500: "#ec003f",
	600: "#ec003f",
	700: "#c70036",
	800: "#a50036",
	900: "#8b0836",
	950: "#4d0218",
} as const satisfies Color)

export const slate = defineVars({
	50: "oklch(.984 .003 247.858)",
	100: "oklch(.968 .007 247.896)",
	200: "oklch(.929 .013 255.508)",
	300: "oklch(.869 .022 252.894)",
	400: "oklch(.704 .04 256.788)",
	500: "oklch(.446 .043 257.281)",
	600: "oklch(.446 .043 257.281)",
	700: "oklch(.372 .044 257.287)",
	800: "oklch(.279 .041 260.031)",
	900: "oklch(.208 .042 265.755)",
	950: "oklch(.129 .042 264.695)",
} as const satisfies Color)
