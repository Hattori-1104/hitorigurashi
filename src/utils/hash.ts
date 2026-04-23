export const hash = () =>
	Math.floor(Math.random() * (1 << (4 * 4))).toString(16)
