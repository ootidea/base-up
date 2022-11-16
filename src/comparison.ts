/** Convert Less-Than function (< symbol) to comparator. */
export function ltToComparator<T>(lt: (lhs: T, rhs: T) => boolean): (lhs: T, rhs: T) => number {
  return (lhs, rhs) => {
    if (lt(lhs, rhs)) return -1

    if (lt(rhs, lhs)) return 1

    return 0
  }
}

/** Convert Less-Than or Equal to function (<= symbol) to comparator. */
export function lteToComparator<T>(ltoet: (lhs: T, rhs: T) => boolean): (lhs: T, rhs: T) => number {
  return (lhs, rhs) => {
    if (ltoet(lhs, rhs)) {
      if (ltoet(rhs, lhs)) return 0

      return -1
    }
    return 1
  }
}
