import { Either } from "effect"

export class Stack<T> {
	private items: T[]

	constructor(initialItem: T) {
		this.items = [initialItem]
	}

	push(item: T): void {
		this.items.push(item)
	}

	pop(): Either.Either<null, "empty_stack"> {
		if (!this.canPop) return Either.left("empty_stack")
		this.items.pop()
		return Either.right(null)
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
