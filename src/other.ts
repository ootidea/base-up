import { NonEmptyArray } from './Array/MinLengthArray'
import { push, update } from './collectionUpdate'
import { newMap } from './Map'

export function groupBy<T, U extends keyof any>(self: readonly T[], by: (_: T) => U): Record<U, NonEmptyArray<T>> {
  const result: any = {}
  for (const value of self) {
    const key = by(value)
    result[key] instanceof Array ? result[key].push(value) : (result[key] = [value])
  }
  return result
}
export namespace groupBy {
  export function Map<T, U>(self: readonly T[], by: (_: T) => U): Map<U, NonEmptyArray<T>> {
    const result = newMap<U, NonEmptyArray<T>>()
    for (const value of self) {
      const key = by(value)
      update.Map.mutable(result, key, (prev) => push(prev ?? ([] as const), value))
    }
    return result
  }
}

export function sumOf(self: []): 0
export function sumOf(self: readonly number[]): number
export function sumOf(self: readonly number[]): number {
  return self.reduce((lhs, rhs) => lhs + rhs, 0)
}
