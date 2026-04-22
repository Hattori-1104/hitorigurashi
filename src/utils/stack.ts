import { Effect } from "effect"

export class Stack<T> {
	private items: T[]

	constructor(initialItem: T) {
		this.items = [initialItem]
	}

	push(item: T): void {
		this.items.push(item)
	}

	pop(): Effect.Effect<null, "empty_stack"> {
		if (!this.canPop) return Effect.fail("empty_stack")
		this.items.pop()
		return Effect.succeed(null)
	}

	replace(item: T): void {
		this.items[this.items.length - 1] = item
	}

	get canPop(): boolean {
		return this.items.length > 1
	}

	get head(): T {
		return this.items[this.items.length - 1]
	}
}
