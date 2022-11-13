import { ReadonlyNonEmptyArray } from './Array'
import { newMap, ReadonlyNonEmptyMap } from './Map'
import { newSet, ReadonlyNonEmptySet } from './Set'

export function map<T, U>(self: ReadonlyNonEmptyArray<T>, f: (_: T) => U): ReadonlyNonEmptyArray<U>
export function map<T, U>(self: readonly T[], f: (_: T) => U): readonly U[]
export function map<T, U>(self: readonly T[], f: (_: T) => U): readonly U[] {
  return self.map(f)
}

export namespace map {
  export function* Iterable<T, U>(self: Iterable<T>, f: (_: T) => U): Generator<U> {
    for (const value of self) {
      yield f(value)
    }
  }

  export function Set<T, U>(set: ReadonlyNonEmptySet<T>, f: (_: T) => U): ReadonlyNonEmptySet<U>
  export function Set<T, U>(set: ReadonlySet<T>, f: (_: T) => U): ReadonlySet<U>
  export function Set<T, U>(set: ReadonlySet<T>, f: (_: T) => U): ReadonlySet<U> {
    return newSet(map.Iterable(set.values(), f))
  }

  export function Map<K, T, U>(self: ReadonlyNonEmptyMap<K, T>, f: (_: T) => U): ReadonlyNonEmptyMap<K, U>
  export function Map<K, T, U>(self: ReadonlyMap<K, T>, f: (_: T) => U): ReadonlyMap<K, U>
  export function Map<K, T, U>(self: ReadonlyMap<K, T>, f: (_: T) => U): ReadonlyMap<K, U> {
    return newMap(map.Iterable(self.entries(), ([key, value]) => [key, f(value)]))
  }
}
