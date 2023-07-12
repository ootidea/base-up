import { NonEmptyArray } from './Array/MinLengthArray'
import { Tuple } from './Array/other'
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

export function toMultiset<const T extends Tuple>(self: T): Map<T[number], number> {
  const result = newMap<T[number], number>()
  for (const value of self) {
    const count = result.get(value) ?? 0
    result.set(value, count + 1)
  }
  return result
}

export function sumOf(self: []): 0
export function sumOf(self: readonly number[]): number
export function sumOf(self: readonly number[]): number {
  return self.reduce((lhs, rhs) => lhs + rhs, 0)
}
