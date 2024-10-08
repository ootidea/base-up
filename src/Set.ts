import { everyIterable } from './collectionPredicate'
import { sortBy } from './transform'
import type { Branded } from './type'

declare const NON_EMPTY_SET_TAG: unique symbol
export type NonEmptySet<T> = Branded<Set<T>, typeof NON_EMPTY_SET_TAG>
export type ReadonlyNonEmptySet<T> = Branded<ReadonlySet<T>, typeof NON_EMPTY_SET_TAG>

/**
 * setOf(...) is shorthand for new Set([...]).
 * Note that setOf() is Set<never> type, unlike new Set() being Set<unknown> type.
 * @example
 * setOf(121, 'abc') returns new Set([123, 'abc'])
 * setOf(121, 'abc') is typed as Set<number | string>
 * @example
 * setOf() returns new Set()
 * setOf() is typed as Set<never>
 */
export function setOf(): Set<never>
export function setOf<T extends readonly unknown[]>(...args: T): Set<T[number]>
export function setOf<T extends readonly unknown[]>(...args: T): Set<T[number]> {
  return new Set(args)
}

/**
 * Add the given value to the set, but remove it if it is already included.
 * In other words, toggle the membership of the given value.
 * @example
 * toggleMembership(setOf(1, 2, 3), 2) returns setOf(1, 3)
 * toggleMembership(setOf(1, 2, 3), 4) returns setOf(1, 2, 3, 4)
 */
export function toggleMembership<T, U>(self: ReadonlySet<T>, value: U): Set<T> | Set<T | U> {
  const cloned = new Set(self)
  if (cloned.has(value as any)) {
    cloned.delete(value as any)
  } else {
    cloned.add(value as any)
  }
  return cloned
}
/**
 * @example
 * const set = new Set([1, 2, 3])
 * toggleMembershipMutable(set, 2) // set is now equivalent to Set([1, 3])
 * toggleMembershipMutable(set, 4) // set is now equivalent to Set([1, 3, 4])
 */
export function toggleMembershipMutable<T>(self: Set<T>, value: T): Set<T> {
  if (self.has(value)) {
    self.delete(value)
  } else {
    self.add(value)
  }
  return self
}

export function setMembership<T, U>(self: ReadonlySet<T>, value: U, has: boolean): Set<T | U> {
  const cloned = new Set(self)
  if (has) {
    cloned.add(value as any)
  } else {
    cloned.delete(value as any)
  }
  return cloned
}
export function setMembershipMutable<T>(self: Set<T>, value: T, has: boolean): Set<T> {
  if (has) {
    self.add(value)
  } else {
    self.delete(value)
  }
  return self
}

export function has<T, U extends T>(self: ReadonlySet<U>, value: T): value is U
export function has<T>(self: ReadonlySet<T>, value: T): boolean
export function has<T>(self: ReadonlySet<T>, value: T): boolean {
  return self.has(value as any)
}

/**
 * Create a union set.
 * @example
 * unionOf(setOf(1, 2, 3), setOf(2, 3, 4)) returns setOf(1, 2, 3, 4)
 * unionOf(setOf(1, 2, 3), setOf(2)) returns setOf(1, 2, 3)
 */
export function unionOf<T, U>(lhs: ReadonlyNonEmptySet<T>, rhs: ReadonlySet<U>): NonEmptySet<T | U>
export function unionOf<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlyNonEmptySet<U>): NonEmptySet<T | U>
export function unionOf<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): Set<T | U>
export function unionOf<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>) {
  const cloned = new Set<T | U>(lhs)
  for (const value of rhs) {
    cloned.add(value)
  }
  return cloned
}

/**
 * Create an intersection set.
 * @example
 * intersectionOf(setOf(1, 2, 3), setOf(2, 3, 4)) returns setOf(2, 3)
 * intersectionOf(setOf(1, 2, 3), setOf(4, 5)) returns setOf()
 */
export function intersectionOf<T, U extends T>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): Set<T>
export function intersectionOf<T extends U, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): Set<U>
export function intersectionOf<T>(lhs: ReadonlySet<T>, rhs: ReadonlySet<T>): Set<T>
export function intersectionOf<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): Set<never>
export function intersectionOf<T>(lhs: ReadonlySet<T>, rhs: ReadonlySet<T>): Set<T> {
  const result = new Set<T>()
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

/** isSubsetOf(a, b) means a ⊆ b. */
export function isSubsetOf<T>(lhs: ReadonlySet<T>, rhs: ReadonlySet<T>): boolean {
  return everyIterable(lhs, (element) => rhs.has(element))
}
