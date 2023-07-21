import { NonEmptyArray } from './Array/MinLengthArray'
import { newMap } from './Map'

export function groupBy<T, U extends keyof any>(self: readonly T[], by: (_: T) => U): Record<U, NonEmptyArray<T>> {
  const result: Record<U, NonEmptyArray<T>> = {} as any
  for (const value of self) {
    const key = by(value)
    if (!result[key]?.push(value)) {
      result[key] = [value]
    }
  }
  return result
}
export namespace groupBy {
  export function Map<T, U>(self: readonly T[], by: (_: T) => U): Map<U, NonEmptyArray<T>> {
    const result = newMap<U, NonEmptyArray<T>>()
    for (const value of self) {
      const key = by(value)
      if (!result.get(key)?.push(value)) {
        result.set(key, [value])
      }
    }
    return result
  }
}

/**
 * @example
 * toMultiset(['a', 'a', 'b', 'c']) returns new Map([['a', 2], ['b', 1], ['c', 1]])
 * toMultiset('aabc') returns new Map([['a', 2], ['b', 1], ['c', 1]])
 */
export function toMultiset(self: readonly []): Map<never, number>
export function toMultiset(self: ''): Map<never, number>
export function toMultiset<T>(self: Iterable<T>): Map<T, number>
export function toMultiset<T>(self: Iterable<T>): Map<T, number> {
  const result = newMap<T, number>()
  for (const value of self) {
    const count = result.get(value) ?? 0
    result.set(value, count + 1)
  }
  return result
}

export function sumOf(self: readonly []): 0
export function sumOf(self: readonly number[]): number
export function sumOf(self: readonly number[]): number {
  return self.reduce((lhs, rhs) => lhs + rhs, 0)
}
