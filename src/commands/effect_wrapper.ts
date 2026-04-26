import { Data, Effect } from "effect"
import { commands } from "@/types/bindings"

type _Result<T, E> = { status: "ok"; data: T } | { status: "error"; error: E }

class CommandError extends Data.TaggedError("CommandError")<{
	commandName: string
}> {}

export const wrapEffect = <Args extends unknown[], T, E>(
	command: (...args: Args) => Promise<_Result<T, E>>,
) => {
	return (...args: Args) =>
		Effect.gen(function* () {
			const result = yield* Effect.promise(() => command(...args))
			if (result.status === "ok") return result.data
			else
				return yield* Effect.fail(
					new CommandError({ commandName: command.name }),
				)
		})
}
