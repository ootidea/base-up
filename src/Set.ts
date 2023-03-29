import { AccurateTuple } from './Array'
import { every } from './collectionPredicate'
import { sortBy } from './transform'
import { Known, Nominal } from './type'

declare const NON_EMPTY_SET_TAG: unique symbol
export type NonEmptySet<T> = Nominal<Set<T>, typeof NON_EMPTY_SET_TAG>
export type ReadonlyNonEmptySet<T> = Nominal<ReadonlySet<T>, typeof NON_EMPTY_SET_TAG>

/**
 * Wrapper function for the Set constructor.
 * Use to avoid name conflicts.
 */
export function newSet<T>(...args: ConstructorParameters<typeof Set<T>>) {
  return new Set(...args)
}

export function setOf<H extends Known, T extends AccurateTuple>(head: H, ...tail: T): NonEmptySet<H | T[number]>
export function setOf<T extends AccurateTuple>(...args: T): Set<T[number]>
export function setOf<T extends AccurateTuple>(...args: T): Set<T[number]> {
  return new Set(args)
}

export function toggle<T, U>(self: ReadonlySet<T>, value: U): Set<T | U> {
  const cloned = new Set(self)
  if (cloned.has(value as any)) {
    cloned.delete(value as any)
  } else {
    cloned.add(value as any)
  }
  return cloned
}

export function has<T, U extends T>(self: ReadonlySet<U>, value: T): value is U
export function has<T>(self: ReadonlySet<T>, value: T): boolean
export function has<T>(self: ReadonlySet<T>, value: T): boolean {
  return self.has(value as any)
}

export function unionOf<T, U>(lhs: ReadonlyNonEmptySet<T>, rhs: ReadonlySet<U>): NonEmptySet<T | U>
export function unionOf<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlyNonEmptySet<U>): NonEmptySet<T | U>
export function unionOf<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): Set<T | U> {
  const cloned = new Set<T | U>(lhs)
  for (const value of rhs.values()) {
    cloned.add(value)
  }
  return cloned
}

export function intersectionOf<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): Set<T & U> {
  const result = new Set<T & U>()
  const [small, big] = sortBy([lhs, rhs], (set) => set.size)
  for (const value of small) {
    if (big.has(value as any)) {
      result.add(value as any)
    }
  }
  return result
}

/**
 * Create the set difference(lhs - rhs) that elements are contained lhs but not contained rhs.
 * @example
 * differenceOf(setOf(1, 2, 3), setOf(2, 3, 4)) returns setOf(1)
 */
export function differenceOf<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): Set<T> {
  const cloned = new Set<T>(lhs)
  for (const value of rhs) {
    cloned.delete(value as any)
  }
  return cloned
}

export function isDisjoint<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): boolean {
  const [small, big] = sortBy([lhs, rhs], (set) => set.size)
  for (const value of small) {
    if (big.has(value as any)) {
      return false
    }
  }
  return true
}

/** isSubset(a, b) means a ⊆ b. */
export function isSubset<T>(lhs: ReadonlySet<T>, rhs: ReadonlySet<T>): boolean {
  return every.Iterable(lhs, (element) => rhs.has(element))
}
