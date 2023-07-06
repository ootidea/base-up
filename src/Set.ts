import { Tuple } from './Array/other'
import { every } from './collectionPredicate'
import { sortBy } from './transform'
import { Branded } from './type'

declare const NON_EMPTY_SET_TAG: unique symbol
export type NonEmptySet<T> = Branded<Set<T>, typeof NON_EMPTY_SET_TAG>
export type ReadonlyNonEmptySet<T> = Branded<ReadonlySet<T>, typeof NON_EMPTY_SET_TAG>

/**
 * Wrapper function for the Set constructor.
 * Use to avoid name conflicts.
 */
export function newSet<T>(...args: ConstructorParameters<typeof Set<T>>): Set<T> {
  return new Set(...args)
}

export function setOf<const T extends Tuple>(...args: T): T extends readonly [] ? Set<never> : NonEmptySet<T[number]> {
  return new Set(args) as any
}

/**
 * Add the given value to the set, but remove it if it is already included.
 * In other words, toggle the boolean value of whether an item is included in the set.
 * @example
 * toggle(setOf(1, 2, 3), 2) returns setOf(1, 3)
 * toggle(setOf(1, 2, 3), 4) returns setOf(1, 2, 3, 4)
 */
export function toggle<T, U>(self: ReadonlySet<T>, value: U): Set<T | U> {
  const cloned = new Set(self)
  if (cloned.has(value as any)) {
    cloned.delete(value as any)
  } else {
    cloned.add(value as any)
  }
  return cloned
}

export function setWhetherHas<T, U>(self: ReadonlySet<T>, value: U, has: boolean): Set<T | U> {
  const cloned = new Set(self)
  if (has) {
    cloned.add(value as any)
  } else {
    cloned.delete(value as any)
  }
  return cloned
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
  return every.Iterable(lhs, (element) => rhs.has(element))
}
