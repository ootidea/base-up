import { zipAll } from './fusion'

/** Convert Less-Than function (< symbol) to comparator. */
export function ltToComparator<T>(lt: (lhs: T, rhs: T) => boolean): (lhs: T, rhs: T) => number {
  return (lhs, rhs) => {
    if (lt(lhs, rhs)) return -1

    if (lt(rhs, lhs)) return 1

    return 0
  }
}

/** Convert Less-Than or Equal to function (<= symbol) to comparator. */
export function lteToComparator<T>(lte: (lhs: T, rhs: T) => boolean): (lhs: T, rhs: T) => number {
  return (lhs, rhs) => {
    if (lte(lhs, rhs)) {
      if (lte(rhs, lhs)) return 0

      return -1
    }
    return 1
  }
}

/**
 * Compare two iterables lexicographically.
 * @returns true if lhs is lexicographically less than rhs.
 * @example
 * lexicographicLt([1, 2, 3], [1, 2, 4]) returns true
 * lexicographicLt([1, 2, 3], [1, 2, 3]) returns false
 * lexicographicLt([10], [3]) returns false
 * lexicographicLt(['alice'], ['bob']) returns true
 * lexicographicLt([], []) returns false
 * @example Different length
 * lexicographicLt([1, 2, 3], [1, 2]) returns false
 */
export function lexicographicLt<T>(lhs: Iterable<T>, rhs: Iterable<T>): boolean {
  for (const [lhsElement, rhsElement] of zipAll.Iterable(lhs, rhs)) {
    if (lhsElement === undefined) return true

    if (rhsElement === undefined) return false

    // @ts-ignore maybe TypeScript bug. error message: Object is possibly 'null'.
    if (lhsElement < rhsElement) return true

    // @ts-ignore maybe TypeScript bug. error message: Object is possibly 'null'.
    if (rhsElement < lhsElement) return false
  }
  return false
}

export function lexicographicLte<T>(lhs: Iterable<T>, rhs: Iterable<T>): boolean {
  for (const [lhsElement, rhsElement] of zipAll.Iterable(lhs, rhs)) {
    if (lhsElement === undefined) return true

    if (rhsElement === undefined) return false

    // @ts-ignore maybe TypeScript bug. error message: Object is possibly 'null'.
    if (lhsElement < rhsElement) return true

    // @ts-ignore maybe TypeScript bug. error message: Object is possibly 'null'.
    if (rhsElement < lhsElement) return false
  }
  return true
}
