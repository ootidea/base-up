import { zipAllIterable } from './fusion'

/** Convert Less-Than function (< symbol) to comparator. */
export function createComparatorFromIsLessThan<T>(isLessThan: (lhs: T, rhs: T) => boolean): (lhs: T, rhs: T) => number {
  return (lhs, rhs) => {
    if (isLessThan(lhs, rhs)) return -1

    if (isLessThan(rhs, lhs)) return 1

    return 0
  }
}

/** Convert Less-Than or Equal to function (<= symbol) to comparator. */
export function createComparatorFromIsAtMost<T>(isAtMost: (lhs: T, rhs: T) => boolean): (lhs: T, rhs: T) => number {
  return (lhs, rhs) => {
    if (isAtMost(lhs, rhs)) {
      if (isAtMost(rhs, lhs)) return 0

      return -1
    }
    return 1
  }
}

/**
 * Compare two iterables lexicographically.
 * @returns true if lhs is lexicographically less than rhs.
 * @example
 * isLexicographicLessThan([1, 2, 3], [1, 2, 4]) returns true
 * isLexicographicLessThan([1, 2, 3], [1, 2, 3]) returns false
 * isLexicographicLessThan([10], [3]) returns false
 * isLexicographicLessThan(['alice'], ['bob']) returns true
 * isLexicographicLessThan([], []) returns false
 * @example Different length
 * isLexicographicLessThan([1, 2, 3], [1, 2]) returns false
 */
export function isLexicographicLessThan<T>(lhs: Iterable<T>, rhs: Iterable<T>): boolean {
  for (const [lhsElement, rhsElement] of zipAllIterable(lhs, rhs)) {
    if (lhsElement === undefined) return true

    if (rhsElement === undefined) return false

    // @ts-ignore maybe TypeScript bug. error message: Object is possibly 'null'.
    if (lhsElement < rhsElement) return true

    // @ts-ignore maybe TypeScript bug. error message: Object is possibly 'null'.
    if (rhsElement < lhsElement) return false
  }
  return false
}

export function isLexicographicAtMost<T>(lhs: Iterable<T>, rhs: Iterable<T>): boolean {
  for (const [lhsElement, rhsElement] of zipAllIterable(lhs, rhs)) {
    if (lhsElement === undefined) return true

    if (rhsElement === undefined) return false

    // @ts-ignore maybe TypeScript bug. error message: Object is possibly 'null'.
    if (lhsElement < rhsElement) return true

    // @ts-ignore maybe TypeScript bug. error message: Object is possibly 'null'.
    if (rhsElement < lhsElement) return false
  }
  return true
}
