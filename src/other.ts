import { NonEmptyArray, ReadonlyNonEmptyArray } from './Array'
import { push, update } from './collectionUpdate'

export function groupBy<T, U>(self: readonly T[], by: (_: T) => U): Map<U, ReadonlyNonEmptyArray<T>> {
  const result = new Map<U, NonEmptyArray<T>>()
  for (const value of self) {
    const key = by(value)
    update.Map.mutable(result, key, (prev) => push(prev ?? ([] as const), value))
  }
  return result
}
