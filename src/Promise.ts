export const forever: Promise<never> = new Promise(() => {})

export type Promisable<T> = T | PromiseLike<T>

export function newPromise<T>(...args: ConstructorParameters<typeof Promise<T>>) {
  return new Promise(...args)
}
