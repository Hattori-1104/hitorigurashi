import { Either } from "effect"
import { hash } from "./hash"

type IteratorResult<T> = {
	value: T
	hash: string
}

export class Stack<T> implements Iterable<IteratorResult<T>> {
	private items: T[]
	private hashList: string[]

	constructor(initialItem: T) {
		this.items = [initialItem]
		this.hashList = [hash()]
	}

	push(item: T): void {
		if (item !== this.head) {
			this.items.push(item)
			this.hashList.push(hash())
		}
	}

	pop(): Either.Either<null, "empty_stack"> {
		if (!this.canPop) return Either.left("empty_stack")
		this.items.pop()
		this.hashList.pop()
		return Either.right(null)
	}

	replace(item: T): void {
		this.items[this.items.length - 1] = item
		this.hashList[this.hashList.length - 1] = hash()
	}

	[Symbol.iterator](): Iterator<IteratorResult<T>> {
		let i = 0
		const items = this.items
		const hashList = this.hashList
		return {
			next() {
				if (i >= items.length) return { value: undefined, done: true }
				const currentIndex = i
				i++
				return {
					value: {
						value: items[currentIndex],
						hash: hashList[currentIndex],
					},
					done: false,
				}
			},
		}
	}

	get canPop(): boolean {
		return this.items.length > 1
	}

	get head(): T {
		return this.items[this.items.length - 1]
	}
}
