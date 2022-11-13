import { LimitedSizeArray, ReadonlyNonEmptyArray } from './Array'

export function take<T, N extends number>(self: Iterable<T>, n: N): LimitedSizeArray<N, T>
export function take<T>(self: Iterable<T>, n: number): readonly T[]
export function take<T>(self: Iterable<T>, n: number): readonly T[] {
  const result: T[] = []
  const iterator = self[Symbol.iterator]()
  for (let element = iterator.next(); !element.done && result.length < n; element = iterator.next()) {
    result.push(element.value)
  }
  iterator.return?.()
  return result as any
}

export function tail<T>(self: ReadonlyNonEmptyArray<T>): readonly T[]
export function tail<T>(self: readonly T[]): readonly T[] | undefined
export function tail<T>(self: readonly T[]): readonly T[] | undefined {
  if (self.length === 0) return undefined

  const cloned = self.slice()
  cloned.shift()
  return cloned
}
