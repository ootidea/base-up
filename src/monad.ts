import { ReadonlyNonEmptyArray } from './Array/type'
import { map as mapIterable } from './Iterable'
import { newSet, ReadonlyNonEmptySet } from './Set'

export function map<T, U>(self: ReadonlyNonEmptyArray<T>, f: (_: T) => U): ReadonlyNonEmptyArray<U>
export function map<T, U>(self: readonly T[], f: (_: T) => U): readonly U[]
export function map<T, U>(self: readonly T[], f: (_: T) => U): readonly U[] {
  return self.map(f)
}

export namespace map {
  export function Set<T, U>(set: ReadonlyNonEmptySet<T>, f: (_: T) => U): ReadonlyNonEmptySet<U>
  export function Set<T, U>(set: ReadonlySet<T>, f: (_: T) => U): ReadonlySet<U>
  export function Set<T, U>(set: ReadonlySet<T>, f: (_: T) => U): ReadonlySet<U> {
    return newSet(mapIterable(set.values(), f))
  }
}
