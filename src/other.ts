import { NonEmptyArray } from './Array/MinLengthArray'
import { push, update } from './collectionUpdate'

export function groupBy<T, U>(self: readonly T[], by: (_: T) => U): Map<U, NonEmptyArray<T>> {
  const result = new Map<U, NonEmptyArray<T>>()
  for (const value of self) {
    const key = by(value)
    update.Map.mutable(result, key, (prev) => push(prev ?? ([] as const), value))
  }
  return result
}

export function sumOf(self: []): 0
export function sumOf(self: readonly number[]): number
export function sumOf(self: readonly number[]): number {
  return self.reduce((lhs, rhs) => lhs + rhs, 0)
}
