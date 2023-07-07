import { FixedLengthArray } from './Array/FixedLengthArray'
import { MaxLengthArray } from './Array/MaxLengthArray'
import { MinLengthArray, NonEmptyArray, ReadonlyNonEmptyArray } from './Array/MinLengthArray'
import { Tuple } from './Array/other'
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
  export function defer<const T, const U>(
    f: (_: T) => U
  ): { (_: ReadonlyNonEmptyArray<T>): NonEmptyArray<U>; (_: readonly T[]): U[] } {
    return (self: any) => map(self, f)
  }

  export function* Iterable<T, U>(self: Iterable<T>, f: (_: T) => U): Iterable<U> {
    for (const value of self) {
      yield f(value)
    }
  }

  export function Set<T, U>(self: ReadonlyNonEmptySet<T>, f: (_: T) => U): NonEmptySet<U>
  export function Set<T, U>(self: ReadonlySet<T>, f: (_: T) => U): Set<U>
  export function Set<T, U>(self: ReadonlySet<T>, f: (_: T) => U): Set<U> {
    return newSet(map.Iterable(self, f))
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
      for (const value of set) {
        result.add(value)
      }
    }
    return result
  }
}

export function take<T, N extends number>(self: Iterable<T>, n: N): MaxLengthArray<N, T> {
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

  /**
   * @example
   * take.string('abc', 2) returns 'ab'
   * take.string('abc', 0) returns ''
   * take.string('abc', 4) returns 'abc'
   */
  export function string(self: string, n: number): string {
    return self.slice(0, n)
  }
}

/**
 * @example
 * Drop<[0, 1, 2], 0> is equivalent to [0, 1, 2]
 * Drop<[0, 1, 2], 1> is equivalent to [1, 2]
 * Drop<[0, 1, 2], 2> is equivalent to [2]
 * Drop<[0, 1, 2], 3> is equivalent to []
 * Drop<[0, 1, 2], 4> is equivalent to []
 * @example
 * Drop<[0, 1, 2], 1 | 2> is equivalent to [1, 2] | [2]
 * Drop<[0, 1, 2], number> is equivalent to [0, 1, 2] | [1, 2] | [2] | []
 * @example
 * Drop<[number, ...string[]], 2> is equivalent to string[]
 * Drop<any, 1> is equivalent to any
 */
export type Drop<T extends Tuple, N extends number = 1> = N extends N
  ? number extends N
    ? _Drop<T, MaxLengthArray<T['length']>>
    : _Drop<T, FixedLengthArray<N>>
  : never
type _Drop<T extends Tuple, N extends Tuple> = N extends readonly [any, ...infer NL]
  ? T extends readonly [any, ...infer TL]
    ? _Drop<TL, NL>
    : T extends []
    ? []
    : T
  : T
/**
 * Remove the first n elements from an array immutably.
 * If the second argument is omitted, it removes only one element.
 *
 * @example
 * drop([0, 1, 2]) is equivalent to [1, 2]
 * drop([0, 1, 2], 2) is equivalent to [2]
 * drop([0, 1, 2], 3) is equivalent to []
 * @example
 * drop([0, 1, 2], 4) is equivalent to []
 * drop([0, 1, 2], 0) is equivalent to [0, 1, 2]
 * drop([0, 1, 2], -1) is equivalent to [0, 1, 2]
 */
export function drop<const T extends Tuple>(self: T): Drop<T, 1>
export function drop<const T extends Tuple, N extends number>(self: T, n: N): Drop<T, N>
export function drop<const T extends Tuple>(self: T, n: number = 1) {
  return self.slice(Math.max(n, 0))
}
export namespace drop {
  /**
   * @example
   * drop.string('abc', 2) returns 'c'
   * drop.string('abc', 0) returns 'abc'
   * drop.string('abc', 4) returns ''
   */
  export function string(self: string, n: number = 1): string {
    return self.slice(Math.max(n, 0))
  }

  export function* Iterable<T>(self: Iterable<T>, n: number = 1): Iterable<T> {
    const iterator = self[Symbol.iterator]()
    for (let i = 0; i < n; i++) {
      iterator.next()
    }
    for (let element = iterator.next(); !element.done; element = iterator.next()) {
      yield element.value
    }
    iterator.return?.()
  }
}

/**
 * @example
 * DropLast<[0, 1, 2], 0> is equivalent to [0, 1, 2]
 * DropLast<[0, 1, 2], 1> is equivalent to [0, 1]
 * DropLast<[0, 1, 2], 2> is equivalent to [0]
 * DropLast<[0, 1, 2], 3> is equivalent to []
 * DropLast<[0, 1, 2], 4> is equivalent to []
 * @example
 * DropLast<[0, 1, 2], 1 | 2> is equivalent to [0, 1] | [0]
 * DropLast<[0, 1, 2], number> is equivalent to [0, 1, 2] | [0, 1] | [0] | []
 * @example
 * DropLast<[...number[], boolean], 2> is equivalent to number[]
 * DropLast<any, 1> is equivalent to any
 */
export type DropLast<T extends Tuple, N extends number = 1> = N extends N
  ? number extends N
    ? _DropLast<T, MaxLengthArray<T['length']>>
    : _DropLast<T, FixedLengthArray<N>>
  : never
type _DropLast<T extends Tuple, N extends Tuple> = N extends readonly [any, ...infer NL]
  ? T extends readonly [...infer TL, any]
    ? _DropLast<TL, NL>
    : T extends []
    ? []
    : T
  : T
/**
 * Remove the last n elements from an array immutably.
 * If the second argument is omitted, it removes only one element.
 *
 * @example
 * dropLast([0, 1, 2]) is equivalent to [0, 1]
 * dropLast([0, 1, 2], 2) is equivalent to [0]
 * dropLast([0, 1, 2], 3) is equivalent to []
 * @example
 * dropLast([0, 1, 2], 4) is equivalent to []
 * dropLast([0, 1, 2], 0) is equivalent to [0, 1, 2]
 * dropLast([0, 1, 2], -1) is equivalent to [0, 1, 2]
 */
export function dropLast<const T extends Tuple>(self: T): DropLast<T, 1>
export function dropLast<const T extends Tuple, N extends number>(self: T, n: N): DropLast<T, N>
export function dropLast<const T extends Tuple>(self: T, n: number = 1) {
  return self.slice(0, Math.max(self.length - n, 0))
}

/** @deprecated */
export function tail<T>(self: ReadonlyNonEmptyArray<T>): T[]
export function tail<T>(self: readonly T[]): T[] | undefined
export function tail<T>(self: readonly T[]): T[] | undefined {
  if (self.length === 0) return undefined

  return self.slice(1)
}
export namespace tail {
  export function* Iterable<T>(self: Iterable<T>): Iterable<T> {
    const iterator = self[Symbol.iterator]()
    iterator.next()
    for (let element = iterator.next(); !element.done; element = iterator.next()) {
      yield element.value
    }
    iterator.return?.()
  }
}

export namespace join {
  export function Array<T, const U extends Tuple>(self: readonly (readonly T[])[], ...values: U): (T | U[number])[] {
    const result: (T | U[number])[] = []
    for (let i = 0; i < self.length; i++) {
      if (i > 0) {
        result.push(...values)
      }
      result.push(...self[i]!)
    }
    return result
  }
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
): number extends N ? readonly T[][] : readonly FixedLengthArray<N, T>[] {
  if (size <= 0) {
    throw RangeError(`Size(${size}) must be greater than 0.`)
  }

  const result = []
  for (let i = 0; i + size <= array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result as any
}

export function padStart<T, N extends number>(self: readonly T[], length: N, value: T): MinLengthArray<N, T> {
  const paddingSize = Math.max(length - self.length, 0)
  return [...repeat(paddingSize, value), ...self] as any
}

export function padEnd<T, N extends number>(self: readonly T[], length: N, value: T): MinLengthArray<N, T> {
  const paddingSize = Math.max(length - self.length, 0)
  return [...self, ...repeat(paddingSize, value)] as any
}

export function sort<const T extends Tuple>(self: T): FixedLengthArray<T['length'], T[number]> {
  return sortBy(self, identity)
}

export function sortBy<const T extends Tuple, U>(
  self: T,
  by: (_: T[number]) => U
): FixedLengthArray<T['length'], T[number]> {
  return [...self].sort(ltToComparator((lhs, rhs) => by(lhs) < by(rhs))) as any
}

/**
 * @example
 * Reverse<[0, 1, 2]> is equivalent to [2, 1, 0]
 * Reverse<[]> is equivalent to []
 * Reverse<string[]> is equivalent to string[]
 * @example
 * Reverse<[0, 1] | [0, 1, 2]> is equivalent to [1, 0] | [2, 1, 0]
 * Reverse<[0, 1, ...number[], 9]> is equivalent to [9, ...number[], 1, 0]
 */
export type Reverse<T extends Tuple> = T extends readonly [infer First, ...infer R, infer Last]
  ? [Last, ...Reverse<R>, First]
  : T extends readonly [infer First, ...infer R]
  ? [...Reverse<R>, First]
  : T extends readonly [...infer R, infer Last]
  ? [Last, ...Reverse<R>]
  : T extends []
  ? []
  : T[number][] extends T
  ? T
  : T extends readonly [(infer H)?, ...infer L]
  ? Reverse<L> | [...Reverse<L>, H]
  : T

export function reverse<const T extends Tuple>(self: T): Reverse<T> {
  return [...self].reverse() as Reverse<T>
}
export namespace reverse {
  export function* Iterable<T>(self: readonly T[]): Iterable<T> {
    for (let i = self.length - 1; i >= 0; i--) {
      yield self[i]!
    }
  }
}

/**
 * @example
 * removeDuplicates(['a', 'b', 'a', 'c']) returns ['a', 'b', 'c']
 * removeDuplicates([]) returns []
 * removeDuplicates([undefined, null, null, null, undefined]) returns [undefined, null]
 */
export function removeDuplicates<T>(self: readonly T[]): T[] {
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
export namespace removeDuplicates {
  export function* Iterable<T>(self: Iterable<T>): Iterable<T> {
    const set = new Set<T>()
    for (const value of self) {
      if (!set.has(value)) {
        set.add(value)
        yield value
      }
    }
  }
}

export function removeDuplicatesBy<T, U>(self: readonly T[], by: (_: T) => U): T[] {
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
export namespace removeDuplicatesBy {
  export function* Iterable<T, U>(self: Iterable<T>, by: (_: T) => U): Iterable<T> {
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
