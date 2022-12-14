import {
  AccurateTuple,
  FixedSizeArray,
  NonEmptyArray,
  OrLessSizeArray,
  OrMoreSizeArray,
  ReadonlyNonEmptyArray,
  Tuple,
} from './Array'
import { ltToComparator } from './comparison'
import { identity } from './Function'
import { repeat } from './generate'
import { newMap, NonEmptyMap, ReadonlyNonEmptyMap } from './Map'
import { newPromise } from './Promise'
import { newSet, NonEmptySet, ReadonlyNonEmptySet } from './Set'

export function map<T, U>(self: ReadonlyNonEmptyArray<T>, f: (_: T) => U): NonEmptyArray<U>
export function map<T, U>(self: readonly T[], f: (_: T) => U): U[]
export function map<T, U>(self: readonly T[], f: (_: T) => U): U[] {
  return self.map(f)
}
export namespace map {
  export function* Iterable<T, U>(self: Iterable<T>, f: (_: T) => U): Generator<U> {
    for (const value of self) {
      yield f(value)
    }
  }

  export function Set<T, U>(self: ReadonlyNonEmptySet<T>, f: (_: T) => U): NonEmptySet<U>
  export function Set<T, U>(self: ReadonlySet<T>, f: (_: T) => U): Set<U>
  export function Set<T, U>(self: ReadonlySet<T>, f: (_: T) => U): Set<U> {
    return newSet(map.Iterable(self.values(), f))
  }

  export function Map<K, T, U>(self: ReadonlyNonEmptyMap<K, T>, f: (_: T) => U): NonEmptyMap<K, U>
  export function Map<K, T, U>(self: ReadonlyMap<K, T>, f: (_: T) => U): Map<K, U>
  export function Map<K, T, U>(self: ReadonlyMap<K, T>, f: (_: T) => U): Map<K, U> {
    return newMap(map.Iterable(self.entries(), ([key, value]) => [key, f(value)]))
  }

  export function Promise<T, U>(self: PromiseLike<T>, f: (_: T) => U): Promise<U> {
    return newPromise<U>((resolve, reject) => {
      self.then((value) => resolve(f(value)), reject)
    })
  }
}

export function flatten<T>(self: readonly (readonly T[])[]): T[] {
  return self.flatMap((x) => x)
}
export namespace flatten {
  export function Set<T>(self: ReadonlySet<ReadonlySet<T>>): Set<T> {
    const result = newSet<T>()
    for (const set of self) {
      for (const value of set.values()) {
        result.add(value)
      }
    }
    return result
  }
}

export function take<T, N extends number>(self: Iterable<T>, n: N): OrLessSizeArray<N, T> {
  const result: T[] = []
  const iterator = self[Symbol.iterator]()
  for (let element = iterator.next(); !element.done && result.length < n; element = iterator.next()) {
    result.push(element.value)
  }
  iterator.return?.()
  return result as any
}
export namespace take {
  export function* Iterable<T>(self: Iterable<T>, n: number): Iterable<T> {
    let i = 0
    for (const value of self) {
      if (i === n) return

      yield value
      i++
    }
  }
}

export function tail<T>(self: ReadonlyNonEmptyArray<T>): T[]
export function tail<T>(self: readonly T[]): T[] | undefined
export function tail<T>(self: readonly T[]): T[] | undefined {
  if (self.length === 0) return undefined

  return self.slice(1)
}
export namespace tail {
  export function* Iterable<T>(self: Iterable<T>): Iterable<T> {
    const iterator = self[Symbol.iterator]()
    let element = iterator.next()
    for (element = iterator.next(); !element.done; element = iterator.next()) {
      yield element.value
    }
    iterator.return?.()
  }
}

export function join<T, U extends AccurateTuple>(self: readonly (readonly T[])[], ...values: U): (T | U[number])[]
export function join<T, U extends Tuple>(self: readonly (readonly T[])[], ...values: U): (T | U[number])[]
export function join<T, U extends Tuple>(self: readonly (readonly T[])[], ...values: U): (T | U[number])[] {
  const result: (T | U[number])[] = []
  for (let i = 0; i < self.length; i++) {
    if (i > 0) {
      result.push(...values)
    }
    result.push(...self[i])
  }
  return result
}

/**
 * @example
 * chunk([1, 2, 3, 4, 5, 6], 2) returns [[1, 2], [3, 4], [5, 6]]
 * chunk([1, 2, 3, 4, 5, 6], 2) is typed as readonly [number, number][]
 * @example
 * chunk([3, 1, 4, 1, 5, 9, 2], 3) returns [[3, 1, 4], [1, 5, 9]]
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

export function padStart<T, N extends number>(self: readonly T[], length: N, value: T): OrMoreSizeArray<N, T> {
  const paddingSize = Math.max(length - self.length, 0)
  return [...repeat(paddingSize, value), ...self] as any
}

export function padEnd<T, N extends number>(self: readonly T[], length: N, value: T): OrMoreSizeArray<N, T> {
  const paddingSize = Math.max(length - self.length, 0)
  return [...self, ...repeat(paddingSize, value)] as any
}

export function sort<T>(self: []): []
export function sort<T>(self: readonly [T]): [T]
export function sort<T>(self: ReadonlyNonEmptyArray<T>): NonEmptyArray<T>
export function sort<T>(self: readonly T[]): T[]
export function sort<T>(self: readonly T[]): T[] {
  return sortBy(self, identity)
}

export function sortBy<T, U>(self: [], by: (_: T) => U): []
export function sortBy<T, U>(self: readonly [T], by: (_: T) => U): [T]
export function sortBy<T, U>(self: ReadonlyNonEmptyArray<T>, by: (_: T) => U): NonEmptyArray<T>
export function sortBy<T, U>(self: readonly T[], by: (_: T) => U): T[]
export function sortBy<T, U>(self: readonly T[], by: (_: T) => U): T[] {
  return [...self].sort(ltToComparator((lhs, rhs) => by(lhs) < by(rhs)))
}

export function reverse<T>(self: ReadonlyNonEmptyArray<T>): NonEmptyArray<T>
export function reverse<T>(self: readonly T[]): T[]
export function reverse<T>(self: readonly T[]): T[] {
  return [...self].reverse()
}
export namespace reverse {
  export function* Iterable<T>(self: readonly T[]): Generator<T> {
    for (let i = self.length - 1; i >= 0; i--) {
      yield self[i]
    }
  }
}

export function unique<T>(self: readonly T[]): T[] {
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

export function uniqueBy<T, U>(self: readonly T[], by: (_: T) => U): T[] {
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
