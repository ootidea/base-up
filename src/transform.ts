import { FixedSizeArray, LimitedSizeArray, ReadonlyNonEmptyArray } from './Array'
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

  export function Set<T, U>(self: ReadonlyNonEmptySet<T>, f: (_: T) => U): ReadonlyNonEmptySet<U>
  export function Set<T, U>(self: ReadonlySet<T>, f: (_: T) => U): ReadonlySet<U>
  export function Set<T, U>(self: ReadonlySet<T>, f: (_: T) => U): ReadonlySet<U> {
    return newSet(map.Iterable(self.values(), f))
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

  return self.slice(0, self.length - 1)
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

/**
 * @example
 * chunk([1, 2, 3, 4, 5, 6], 2) results [[1, 2], [3, 4], [5, 6]]
 * chunk([1, 2, 3, 4, 5, 6], 2) is typed as readonly [number, number][]
 * @example
 * chunk([3, 1, 4, 1, 5, 9, 2], 3) results [[3, 1, 4], [1, 5, 9]]
 * chunk([3, 1, 4, 1, 5, 9, 2], 3) is typed as readonly [number, number, number][]
 */
export function chunk<T, N extends number>(
  array: readonly T[],
  size: N
): number extends N ? readonly T[][] : readonly FixedSizeArray<N, T>[] {
  if (size <= 0) {
    throw RangeError(`Size(${size}) must be greater than 0.`)
  }

  const result = []
  for (let i = 0; i + size <= array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result as any
}

export function reverse<T>(self: ReadonlyNonEmptyArray<T>): ReadonlyNonEmptyArray<T>
export function reverse<T>(self: readonly T[]): readonly T[]
export function reverse<T>(self: readonly T[]): readonly T[] {
  const cloned = self.slice()
  return cloned.reverse()
}
export namespace reverse {
  export function* Iterable<T>(self: readonly T[]): Generator<T> {
    for (let i = self.length - 1; i >= 0; i--) {
      yield self[i]
    }
  }
}

export function unique<T>(self: readonly T[]): readonly T[] {
  const set = new Set<T>()
  const result = []
  for (const value of self) {
    if (!set.has(value)) {
      set.add(value)
      result.push(value)
    }
  }
  return result
}
export namespace unique {
  export function* Iterable<T>(self: Iterable<T>): Generator<T> {
    const set = new Set<T>()
    for (const value of self) {
      if (!set.has(value)) {
        set.add(value)
        yield value
      }
    }
  }
}

export function uniqueBy<T, U>(self: readonly T[], by: (_: T) => U): readonly T[] {
  const set = new Set<U>()
  const result = []
  for (const value of self) {
    const temp = by(value)
    if (!set.has(temp)) {
      set.add(temp)
      result.push(value)
    }
  }
  return result
}
export namespace uniqueBy {
  export function* Iterable<T, U>(self: Iterable<T>, by: (_: T) => U): Generator<T> {
    const set = new Set<U>()
    for (const value of self) {
      const temp = by(value)
      if (!set.has(temp)) {
        set.add(temp)
        yield value
      }
    }
  }
}
