import { sortBy } from '../Array/order'
import { map as mapIterator } from '../Iterator/other'
import { Nominal } from '../other'

declare const NON_EMPTY_SET_TAG: unique symbol
export type NonEmptySet<T> = Nominal<Set<T>, typeof NON_EMPTY_SET_TAG>
export type ReadonlyNonEmptySet<T> = Nominal<ReadonlySet<T>, typeof NON_EMPTY_SET_TAG>

export function setOf<H, T extends readonly any[]>(head: H, ...tail: T): ReadonlyNonEmptySet<H | T[number]>
export function setOf<T extends readonly any[]>(...args: T): ReadonlySet<T[number]>
export function setOf<T extends readonly any[]>(...args: T): ReadonlySet<T[number]> {
  return new Set(args)
}

export function isEmpty<T>(set: ReadonlyNonEmptySet<T>): false
export function isEmpty<T>(set: ReadonlySet<T>): boolean
export function isEmpty<T>(set: ReadonlySet<T>): boolean {
  return set.size === 0
}

export function isNotEmpty<T>(set: ReadonlyNonEmptySet<T>): true
export function isNotEmpty<T>(set: ReadonlySet<T>): set is ReadonlyNonEmptySet<T>
export function isNotEmpty<T>(set: ReadonlySet<T>): set is ReadonlyNonEmptySet<T> {
  return set.size > 0
}

export function map<T, U>(set: ReadonlyNonEmptySet<T>, f: (_: T) => U): ReadonlyNonEmptySet<U>
export function map<T, U>(set: ReadonlySet<T>, f: (_: T) => U): ReadonlySet<U>
export function map<T, U>(set: ReadonlySet<T>, f: (_: T) => U): ReadonlySet<U> {
  return new Set(mapIterator(set.values(), f))
}

export function union<T, U>(lhs: ReadonlyNonEmptySet<T>, rhs: ReadonlySet<U>): ReadonlyNonEmptySet<T | U>
export function union<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlyNonEmptySet<U>): ReadonlyNonEmptySet<T | U>
export function union<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): ReadonlySet<T | U> {
  const cloned = new Set<T | U>(lhs)
  for (const value of rhs.values()) {
    cloned.add(value)
  }
  return cloned
}

export function intersection<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): ReadonlySet<T & U> {
  const result = new Set<T & U>()
  const [small, big] = sortBy([lhs, rhs], (set) => set.size)
  for (const value of small.values()) {
    if (big.has(value as any)) {
      result.add(value as any)
    }
  }
  return result
}
