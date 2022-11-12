import { update } from '../MutableMap/other'
import { push } from './modification'
import { AccurateTuple, FixedSizeArray, NonEmptyArray, ReadonlyNonEmptyArray } from './type'

/**
 * @example
 * chunk([1, 2, 3, 4, 5, 6], 2) results [[1, 2], [3, 4], [5, 6]]
 * chunk([1, 2, 3, 4, 5, 6], 2) is typed as readonly [number, number][]
 * @example
 * chunk([3, 1, 4, 1, 5, 9, 2], 3) results [[3, 1, 4], [1, 5, 9]]
 * chunk([3, 1, 4, 1, 5, 9, 2], 3) is typed as readonly [number, number, number][]
 */
export function chunk<T, N extends number>(
  array: readonly T[],
  size: N
): number extends N ? readonly T[][] : readonly FixedSizeArray<N, T>[] {
  if (size <= 0) {
    throw RangeError(`Size(${size}) must be greater than 0.`)
  }

  const result = []
  for (let i = 0; i + size <= array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result as any
}

export function groupBy<T, U>(self: readonly T[], by: (_: T) => U): Map<U, ReadonlyNonEmptyArray<T>> {
  const result = new Map<U, NonEmptyArray<T>>()
  for (const value of self) {
    const key = by(value)
    update(result, key, (prev) => push(prev ?? ([] as const), value))
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
