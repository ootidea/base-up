export const forever: Promise<never> = new Promise(() => {})

export type Promisable<T> = T | PromiseLike<T>
