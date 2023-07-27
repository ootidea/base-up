import { FixedLengthArray } from './Array/FixedLengthArray'
import { MinLengthArray, NonEmptyArray, ReadonlyNonEmptyArray } from './Array/MinLengthArray'
import { Tuple } from './Array/other'
import { createComparatorFromIsLessThan } from './comparison'
import { identity } from './Function'
import { repeat } from './generate'
import { NonEmptyMap, ReadonlyNonEmptyMap } from './Map'
import { NonEmptySet, ReadonlyNonEmptySet } from './Set'
import { Interpolable } from './string/other'
import { Equals } from './typePredicate'

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
    return new globalThis.Set(map.Iterable(self, f))
  }

  export function Map<K, T, U>(self: ReadonlyNonEmptyMap<K, T>, f: (_: T) => U): NonEmptyMap<K, U>
  export function Map<K, T, U>(self: ReadonlyMap<K, T>, f: (_: T) => U): Map<K, U>
  export function Map<K, T, U>(self: ReadonlyMap<K, T>, f: (_: T) => U): Map<K, U> {
    return new globalThis.Map(map.Iterable(self.entries(), ([key, value]) => [key, f(value)]))
  }

  export function Promise<T, U>(self: PromiseLike<T>, f: (_: T) => U): Promise<U> {
    return new globalThis.Promise<U>((resolve, reject) => {
      self.then((value) => resolve(f(value)), reject)
    })
  }
}

/**
 * @example
 * flatMap([0, 1, 2], (x) => [x, x + 0.5]) returns [0, 0.5, 1, 1.5, 2, 2.5]
 */
export function flatMap<T>(self: readonly T[], f: (_: T) => readonly []): []
export function flatMap<T, U>(self: readonly [], f: (_: T) => readonly U[]): []
export function flatMap<T, U>(self: readonly T[], f: (_: T) => readonly U[]): U[]
export function flatMap<T, U>(self: readonly T[], f: (_: T) => readonly U[]): U[] {
  return self.flatMap(f)
}
export namespace flatMap {
  /**
   * @example
   * flatMap.defer((x: number) => [x, x + 0.5])([0, 1, 2]) returns [0, 0.5, 1, 1.5, 2, 2.5]
   */
  export function defer<T, U>(f: (_: T) => readonly U[]): (self: readonly T[]) => U[] {
    return (self: readonly T[]) => self.flatMap(f)
  }

  /**
   * @example
   * flatMap.Iterable([0, 1, 2], (x) => [x, x + 0.5]) yields 0, 0.5, 1, 1.5, 2, 2.5
   */
  export function* Iterable<T, U>(self: Iterable<T>, f: (_: T) => Iterable<U>): Iterable<U> {
    for (const value of self) {
      yield* f(value)
    }
  }
  export namespace Iterable {
    /**
     * @example
     * flatMap.Iterable.defer((x: number) => [x, x + 0.5])([0, 1, 2]) yields 0, 0.5, 1, 1.5, 2, 2.5
     */
    export function defer<T, U>(f: (_: T) => Iterable<U>): (self: Iterable<T>) => Iterable<U> {
      return (self: Iterable<T>) => flatMap.Iterable(self, f)
    }
  }

  /**
   * @example
   * flatMap.Set([0, 1, 2], (x) => [x, x + 0.5]) returns new Set([0, 0.5, 1, 1.5, 2, 2.5])
   */
  export function Set<T, U>(self: Iterable<T>, f: (_: T) => Iterable<U>): Set<U> {
    return new globalThis.Set(flatMap.Iterable(self, f))
  }
}

export function flatten<T>(self: readonly (readonly T[])[]): T[] {
  return self.flatMap((x) => x)
}
export namespace flatten {
  export function Set<T>(self: ReadonlySet<ReadonlySet<T>>): Set<T> {
    const result = new globalThis.Set<T>()
    for (const set of self) {
      for (const value of set) {
        result.add(value)
      }
    }
    return result
  }
}

/**
 * @example
 * Join<['a', 'b', 'c']> equals 'a,b,c'
 * Join<['a', 'b', 'c'], ''> equals 'abc'
 * Join<['a', 'b', 'c'], '-' | '.'> equals 'a-b-c' | 'a.b.c'
 * Join<[], '.'> equals ''
 * @example
 * Join<[1, 2, 3], ' + '> equals '1 + 2 + 3'
 * Join<[Date, RegExp]> equals string
 */
export type Join<T extends Tuple, Separator extends string = ','> = Equals<T, any> extends true
  ? string
  : T extends readonly Interpolable[]
  ? _Join<T, Separator>
  : string
export type _Join<T extends readonly Interpolable[], Separator extends string> = T extends readonly [
  infer U extends Interpolable
]
  ? U
  : T extends readonly [infer H extends Interpolable, ...infer L extends readonly Interpolable[]]
  ? `${H}${Separator}${_Join<L, Separator>}`
  : T extends readonly []
  ? ''
  : string

/**
 * @example
 * join(['a', 'b', 'c']) returns 'a,b,c'
 * join(['a', 'b', 'c'], '') returns 'abc'
 * join([1, 2, 3], ' + ') returns '1 + 2 + 3'
 */
export function join<const T extends Tuple, Separator extends string = ','>(
  self: T,
  separator: Separator = ',' as any
): Join<T, Separator> {
  return self.join(separator) as any
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
 * Split<'12:34', ':'> equals ['12', '34']
 * Split<'12:34:56', ':'> equals ['12', '34', '56']
 * Split<'12:34', '@'> equals ['12:34']
 * Split<'//', '/'> equals ['', '', '']
 * Split<'12:34', ''> equals ['1', '2', ':', '3', '4']
 * Split<`${number}:${number}`, ':'> equals [`${number}`, `${number}`]
 */
export type Split<T extends string, Separator extends string> = T extends `${infer H}${Separator}${infer L}`
  ? `${Separator}${L}` extends ''
    ? [H]
    : [H, ...Split<L, Separator>]
  : [T]

/**
 * @example
 * chunk([1, 2, 3, 4, 5, 6], 2) returns [[1, 2], [3, 4], [5, 6]]
 * chunk([1, 2, 3, 4, 5, 6], 2) is typed as [number, number][]
 * @example
 * chunk([3, 1, 4, 1, 5, 9, 2], 3) returns [[3, 1, 4], [1, 5, 9]]
 * chunk([3, 1, 4, 1, 5, 9, 2], 3) is typed as [number, number, number][]
 */
export function chunk<T, N extends number>(
  array: readonly T[],
  size: N
): number extends N ? T[][] : FixedLengthArray<N, T>[] {
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
  return [...self].sort(createComparatorFromIsLessThan((lhs, rhs) => by(lhs) < by(rhs))) as any
}
export namespace sortBy {
  export function defer<E, U>(
    by: (_: E) => U
  ): <const T extends readonly E[]>(self: T) => FixedLengthArray<T['length'], E> {
    return (self: readonly E[]) =>
      [...self].sort(createComparatorFromIsLessThan((lhs, rhs) => by(lhs) < by(rhs))) as any
  }
}

/**
 * @example
 * Reverse<[0, 1, 2]> equals [2, 1, 0]
 * Reverse<[]> equals []
 * Reverse<string[]> equals string[]
 * @example
 * Reverse<[0, 1] | [0, 1, 2]> equals [1, 0] | [2, 1, 0]
 * Reverse<[0, 1, ...number[], 9]> equals [9, ...number[], 1, 0]
 */
export type Reverse<T extends Tuple> = T extends readonly [infer First, ...infer R, infer Last]
  ? [Last, ...Reverse<R>, First]
  : T extends readonly [infer First, ...infer R]
  ? [...Reverse<R>, First]
  : T extends readonly [...infer R, infer Last]
  ? [Last, ...Reverse<R>]
  : T extends readonly []
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
