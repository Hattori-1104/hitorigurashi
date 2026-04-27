import { Effect } from "effect"

export const effectLoader = async <T>(
	fn: () => Effect.Effect<T, unknown, never>,
): Promise<T> => {
	return Effect.runPromise(fn())
}
