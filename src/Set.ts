import { AccurateTuple } from './Array'
import { every } from './collectionPredicate'
import { sortBy } from './transform'
import { Nominal, PseudoAny } from './type'

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

export function setOf<H extends PseudoAny, T extends AccurateTuple>(head: H, ...tail: T): NonEmptySet<H | T[number]>
export function setOf<T extends AccurateTuple>(...args: T): Set<T[number]>
export function setOf<T extends AccurateTuple>(...args: T): Set<T[number]> {
  return new Set(args)
}

export function has<T, U extends T>(self: ReadonlySet<U>, value: T): value is U
export function has<T>(self: ReadonlySet<T>, value: T): boolean
export function has<T>(self: ReadonlySet<T>, value: T): boolean {
  return self.has(value as any)
}

export function union<T, U>(lhs: ReadonlyNonEmptySet<T>, rhs: ReadonlySet<U>): NonEmptySet<T | U>
export function union<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlyNonEmptySet<U>): NonEmptySet<T | U>
export function union<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): Set<T | U> {
  const cloned = new Set<T | U>(lhs)
  for (const value of rhs.values()) {
    cloned.add(value)
  }
  return cloned
}

export function intersection<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): Set<T & U> {
  const result = new Set<T & U>()
  const [small, big] = sortBy([lhs, rhs], (set) => set.size)
  for (const value of small.values()) {
    if (big.has(value as any)) {
      result.add(value as any)
    }
  }
  return result
}

export function isDisjoint<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): boolean {
  const [small, big] = sortBy([lhs, rhs], (set) => set.size)
  for (const value of small.values()) {
    if (big.has(value as any)) {
      return false
    }
  }
  return true
}

/** isSubset(a, b) means a ⊆ b. */
export function isSubset<T>(lhs: ReadonlySet<T>, rhs: ReadonlySet<T>): boolean {
  return every.Iterable(lhs.values(), (element) => rhs.has(element))
}
