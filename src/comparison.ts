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

export function lexicographicLt<T>(lhs: Iterable<T>, rhs: Iterable<T>): boolean {
  for (const [lhsElement, rhsElement] of zipAll(lhs, rhs)) {
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
  for (const [lhsElement, rhsElement] of zipAll(lhs, rhs)) {
    if (lhsElement === undefined) return true

    if (rhsElement === undefined) return false

    // @ts-ignore maybe TypeScript bug. error message: Object is possibly 'null'.
    if (lhsElement < rhsElement) return true

    // @ts-ignore maybe TypeScript bug. error message: Object is possibly 'null'.
    if (rhsElement < lhsElement) return false
  }
  return true
}
