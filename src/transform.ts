import { LimitedSizeArray, ReadonlyNonEmptyArray } from './Array'
import { id } from './Function'
import { newMap, ReadonlyNonEmptyMap } from './Map'
import { ltToComparator } from './order'
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

export function take<T, N extends number>(self: Iterable<T>, n: N): LimitedSizeArray<N, T>
export function take<T>(self: Iterable<T>, n: number): readonly T[]
export function take<T>(self: Iterable<T>, n: number): readonly T[] {
  const result: T[] = []
  const iterator = self[Symbol.iterator]()
  for (let element = iterator.next(); !element.done && result.length < n; element = iterator.next()) {
    result.push(element.value)
  }
  iterator.return?.()
  return result as any
}

export function tail<T>(self: ReadonlyNonEmptyArray<T>): readonly T[]
export function tail<T>(self: readonly T[]): readonly T[] | undefined
export function tail<T>(self: readonly T[]): readonly T[] | undefined {
  if (self.length === 0) return undefined

  const cloned = self.slice()
  cloned.shift()
  return cloned
}

export function sort<T>(self: []): []
export function sort<T>(self: readonly [T]): readonly [T]
export function sort<T>(self: ReadonlyNonEmptyArray<T>): ReadonlyNonEmptyArray<T>
export function sort<T>(self: readonly T[]): readonly T[]
export function sort<T>(self: readonly T[]): readonly T[] {
  return sortBy(self, id)
}

export function sortBy<T, U>(self: [], by: (_: T) => U): []
export function sortBy<T, U>(self: readonly [T], by: (_: T) => U): readonly [T]
export function sortBy<T, U>(self: ReadonlyNonEmptyArray<T>, by: (_: T) => U): ReadonlyNonEmptyArray<T>
export function sortBy<T, U>(self: readonly T[], by: (_: T) => U): readonly T[]
export function sortBy<T, U>(self: readonly T[], by: (_: T) => U): readonly T[] {
  const cloned = self.slice()
  cloned.sort(ltToComparator((lhs, rhs) => by(lhs) < by(rhs)))
  return cloned
}
