type Ok<T> = {
	success: true
	value: T
}

type Err<E extends string> = {
	success: false
	id: E
}

export type Result<T, E extends string> = Ok<T> | Err<E>

export const resultOk = <T>(value: T): Ok<T> => ({
	success: true,
	value,
})

export const resultErr = <E extends string>(id: E): Err<E> => ({
	success: false,
	id,
})
