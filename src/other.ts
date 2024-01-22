import { NonEmptyArray } from './Array/MinLengthArray'

/**
 * @example for readonly property
 * Mutable<{ readonly name: string, age: number }> is equivalent to { name: string, age: number }
 * @example for readonly Array
 * Mutable<readonly string[]> is equivalent to string[]
 * Mutable<readonly [1, 2, 3]> is equivalent to [1, 2, 3]
 * @example for nested types
 * Mutable<{ nested: { readonly value: string } }> is equivalent to { nested: { readonly value: string } }
 * Mutable<[readonly string[]]> is equivalent to [readonly string[]]
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] }

export function groupBy<T, U>(self: readonly T[], by: (_: T) => U): Map<U, NonEmptyArray<T>> {
  const result = new globalThis.Map<U, NonEmptyArray<T>>()
  for (const value of self) {
    const key = by(value)
    if (!result.get(key)?.push(value)) {
      result.set(key, [value])
    }
  }
  return result
}
export namespace groupBy {
  export function Record<T, U extends keyof any>(self: readonly T[], by: (_: T) => U): Record<U, NonEmptyArray<T>> {
    const result: Record<U, NonEmptyArray<T>> = {} as any
    for (const value of self) {
      const key = by(value)
      if (!result[key]?.push(value)) {
        result[key] = [value]
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
  const result = new globalThis.Map<T, number>()
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
