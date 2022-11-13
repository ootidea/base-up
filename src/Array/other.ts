import { AccurateTuple, NonEmptyArray, ReadonlyNonEmptyArray } from '../Array'
import { push, update } from '../collectionUpdate'

export function groupBy<T, U>(self: readonly T[], by: (_: T) => U): Map<U, ReadonlyNonEmptyArray<T>> {
  const result = new Map<U, NonEmptyArray<T>>()
  for (const value of self) {
    const key = by(value)
    update.Map.mutable(result, key, (prev) => push(prev ?? ([] as const), value))
  }
  return result
}

export function cartesianProductOf<T extends AccurateTuple, U extends AccurateTuple>(
  lhs: T,
  rhs: U
): readonly [T[number], U[number]][] {
  const result = []
  for (const lhsElement of lhs) {
    for (const rhsElement of rhs) {
      result.push([lhsElement, rhsElement])
    }
  }
  return result as any
}
