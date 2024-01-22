import { FixedLengthArray } from './Array/FixedLengthArray'
import { MaxLengthArray } from './Array/MaxLengthArray'
import { ReadonlyNonEmptyArray } from './Array/MinLengthArray'
import { DestructTuple, IsTuple, Tuple } from './Array/other'
import { isNotEmpty } from './collectionPredicate'
import { PrefixesOf } from './combination'
import { Subtract } from './number/other'
import { IntegerRangeThrough } from './number/range'
import { Writable } from './type'
import { Equals, IsOneOf } from './typePredicate'

export function filter<T = never>(self: readonly [], f: (_: T) => boolean): []
export function filter<T, U extends T>(self: readonly T[], f: (_: T) => _ is U): U[]
export function filter<T>(self: readonly T[], f: (_: T) => boolean): T[]
export function filter<T>(self: readonly T[], f: (_: T) => boolean): T[] {
  return self.filter(f) as any
}
export namespace filter {
  export function defer<T, U extends T>(f: (_: T) => _ is U): { (self: readonly []): []; (self: readonly T[]): U[] }
  export function defer<T>(f: (_: T) => boolean): { (self: readonly []): []; (self: readonly T[]): T[] }
  export function defer<T>(f: (_: T) => boolean) {
    return (self: readonly T[]) => self.filter(f)
  }

  export function Iterable<T, U extends T>(self: Iterable<T>, f: (_: T) => _ is U): Iterable<U>
  export function Iterable<T>(self: Iterable<T>, f: (_: T) => boolean): Iterable<T>
  export function* Iterable<T>(self: Iterable<T>, f: (_: T) => boolean): Iterable<T> {
    for (const value of self) {
      if (f(value)) {
        yield value
      }
    }
  }

  export function Set<T, U extends T>(self: ReadonlySet<T>, f: (_: T) => _ is U): Set<U>
  export function Set<T>(self: ReadonlySet<T>, f: (_: T) => boolean): Set<T>
  export function Set<T>(self: ReadonlySet<T>, f: (_: T) => boolean): Set<T> {
    return new globalThis.Set(filter.Iterable(self, f))
  }
}

/**
 * @example
 * Take<[0, 1, 2], 0> equals []
 * Take<[0, 1, 2], 1> equals [0]
 * Take<[0, 1, 2], 2> equals [0, 1]
 * Take<[0, 1, 2], 3> equals [0, 1, 2]
 * Take<[0, 1, 2], 4> equals [0, 1, 2]
 * @example
 * Take<Date[], 2> equals [Date, Date] | [Date] | []
 * Take<[number, ...string[]], 2> equals [number, string] | [number]
 * Take<[...Date[], bigint], 2> equals [Date, Date] | [Date, bigint] | [bigint]
 * @example
 * Take<[0, 1, 2], 1 | 2> equals [0] | [0, 1]
 * Take<[0, 1, 2], number> equals [] | [0] | [0, 1] | [0, 1, 2]
 */
export type Take<T extends Tuple, N extends number> = Equals<T, any> extends true
  ? MaxLengthArray<N, any>
  : IsOneOf<N, [number, any]> extends true
  ? PrefixesOf<T>[number]
  : N extends N
  ? _Take<T, N>
  : never
export type _Take<T extends Tuple, N extends number, R extends Tuple = []> = R['length'] extends N
  ? R
  : T extends readonly [infer H, ...infer L]
  ? _Take<L, N, [...R, H]>
  : T extends readonly []
  ? R
  : Subtract<N, R['length']> extends infer S extends number
  ? IsTuple<T> extends false
    ? [...R, ...MaxLengthArray<S, T[number]>]
    : IntegerRangeThrough<S> extends infer M extends number
    ? M extends M
      ? [
          ...R,
          ...FixedLengthArray<M, DestructTuple<T>['rest'][0]>,
          ...Take<DestructTuple<T>['trailing'], Subtract<S, M>>,
        ]
      : never
    : never
  : never

export function take<const T extends Tuple, const N extends number>(self: T, n: N): Take<T, N>
export function take<T, N extends number>(self: Iterable<T>, n: N): MaxLengthArray<N, T>
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
  export function defer<N extends number>(
    n: N,
  ): { <const T extends Tuple>(_: T): Take<T, N>; <T>(_: Iterable<T>): MaxLengthArray<N, T> } {
    return (self: any) => take(self, n)
  }

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
 * Drop<[0, 1, 2], 0> equals [0, 1, 2]
 * Drop<[0, 1, 2], 1> equals [1, 2]
 * Drop<[0, 1, 2], 2> equals [2]
 * Drop<[0, 1, 2], 3> equals []
 * Drop<[0, 1, 2], 4> equals []
 * @example
 * Drop<[0, 1, 2], 1 | 2> equals [1, 2] | [2]
 * Drop<[0, 1, 2], number> equals [0, 1, 2] | [1, 2] | [2] | []
 * @example
 * Drop<[number, ...string[]], 2> equals string[]
 * Drop<any, 1> equals any
 */
export type Drop<T extends Tuple, N extends number = 1> = N extends N
  ? number extends N
    ? _Drop<T, MaxLengthArray<T['length']>>
    : _Drop<T, FixedLengthArray<N>>
  : never
type _Drop<T extends Tuple, N extends Tuple> = N extends readonly [any, ...infer NL]
  ? T extends readonly [any, ...infer TL]
    ? _Drop<TL, NL>
    : T extends readonly [...infer TL, infer H]
    ? Equals<TL[number], H> extends true
      ? _Drop<TL, NL>
      : T
    : T extends readonly []
    ? []
    : T
  : T

/**
 * Remove the first n elements from an array immutably.
 * If the second argument is omitted, it removes only one element.
 *
 * @example
 * drop([0, 1, 2]) returns [1, 2]
 * drop([0, 1, 2], 2) returns [2]
 * drop([0, 1, 2], 3) returns []
 * @example
 * drop([0, 1, 2], 4) returns []
 * drop([0, 1, 2], 0) returns [0, 1, 2]
 * drop([0, 1, 2], -1) returns [0, 1, 2]
 */
export function drop<const T extends Tuple>(self: T): Drop<T>
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
 * DropLast<[0, 1, 2], 0> equals [0, 1, 2]
 * DropLast<[0, 1, 2], 1> equals [0, 1]
 * DropLast<[0, 1, 2], 2> equals [0]
 * DropLast<[0, 1, 2], 3> equals []
 * DropLast<[0, 1, 2], 4> equals []
 * @example
 * DropLast<[0, 1, 2], 1 | 2> equals [0, 1] | [0]
 * DropLast<[0, 1, 2], number> equals [0, 1, 2] | [0, 1] | [0] | []
 * @example
 * DropLast<[...number[], boolean], 2> equals number[]
 * DropLast<any, 1> equals any
 */
export type DropLast<T extends Tuple, N extends number = 1> = N extends N
  ? number extends N
    ? _DropLast<T, MaxLengthArray<T['length']>>
    : _DropLast<T, FixedLengthArray<N>>
  : never
type _DropLast<T extends Tuple, N extends Tuple> = N extends readonly [any, ...infer NL]
  ? T extends readonly [...infer TL, any]
    ? _DropLast<TL, NL>
    : T extends readonly []
    ? []
    : T
  : T

/**
 * Remove the last n elements from an array immutably.
 * If the second argument is omitted, it removes only one element.
 *
 * @example
 * dropLast([0, 1, 2]) returns [0, 1]
 * dropLast([0, 1, 2], 2) returns [0]
 * dropLast([0, 1, 2], 3) returns []
 * @example
 * dropLast([0, 1, 2], 4) returns []
 * dropLast([0, 1, 2], 0) returns [0, 1, 2]
 * dropLast([0, 1, 2], -1) returns [0, 1, 2]
 */
export function dropLast<const T extends Tuple>(self: T): Writable<DropLast<T, 1>>
export function dropLast<const T extends Tuple, const N extends number>(self: T, n: N): Writable<DropLast<T, N>>
export function dropLast<const T extends Tuple>(self: T, n: number = 1) {
  return self.slice(0, Math.max(self.length - n, 0))
}

export function takeWhile<const T, const U extends T>(self: readonly T[], f: (_: T) => _ is U): U[]
export function takeWhile<const T>(self: readonly T[], f: (_: T) => boolean): T[]
export function takeWhile<const T>(self: readonly T[], f: (_: T) => boolean): T[] {
  const result = []
  for (const value of self) {
    if (!f(value)) return result

    result.push(value)
  }
  return result
}
export namespace takeWhile {
  export function Iterable<T, U extends T>(self: Iterable<T>, f: (_: T) => _ is U): Iterable<U>
  export function Iterable<T>(self: Iterable<T>, f: (_: T) => boolean): Iterable<T>
  export function* Iterable<T>(self: Iterable<T>, f: (_: T) => boolean): Iterable<T> {
    for (const value of self) {
      if (!f(value)) return

      yield value
    }
  }
}

/**
 * @example
 * FirstOf<[bigint]> equals bigint
 * FirstOf<[number, bigint]> equals number
 * FirstOf<[]> equals undefined
 * FirstOf<boolean[]> equals boolean | undefined
 * FirstOf<[...string[], number]> equals string | number
 * @example
 * FirstOf<[Date] | [Date, boolean]> equals Date
 * FirstOf<[Date?, boolean?]> equals Date | boolean | undefined
 */
export type FirstOf<T extends Tuple> = T extends readonly [infer First, ...any]
  ? First
  : T extends readonly [...infer U, infer Last]
  ? _FirstOf<U, Last>
  : T extends readonly []
  ? undefined
  : T[number][] extends T
  ? T[number] | undefined
  : T extends readonly [(infer H)?, ...infer L]
  ? H | FirstOf<L>
  : never
type _FirstOf<T extends Tuple, L> = T extends readonly []
  ? L
  : T extends readonly [...infer T2, infer L2]
  ? _FirstOf<T2, L2>
  : T[0] | L
export function firstOf<const T extends Tuple>(self: T): FirstOf<T> {
  return self[0] as any
}

/**
 * @example
 * LastOf<[bigint]> equals bigint
 * LastOf<[bigint, number]> equals number
 * LastOf<[]> equals undefined
 * LastOf<boolean[]> equals boolean | undefined
 * LastOf<[string, ...string[]]> equals string
 * LastOf<[boolean, ...string[]]> equals boolean | string
 * @example
 * LastOf<[Date] | [Date, boolean]> equals Date | boolean
 * LastOf<[Date?, boolean?]> equals Date | boolean | undefined
 */
export type LastOf<T extends Tuple> = T extends readonly [...any, infer Last]
  ? Last
  : T extends readonly []
  ? undefined
  : T extends readonly [infer H, ...infer L]
  ? _LastOf<H, L>
  : T[number][] extends T
  ? T[number] | undefined
  : T extends readonly [(infer H)?, ...infer L]
  ? H | LastOf<L>
  : T[0] | undefined
type _LastOf<H, L extends Tuple> = L extends readonly []
  ? H
  : L extends readonly [infer H2, ...infer L2]
  ? _LastOf<H2, L2>
  : L[number][] extends L
  ? H | L[0]
  : L extends readonly [(infer H2)?, ...infer L2]
  ? _LastOf<H | H2, L2>
  : H | L[0]
export function lastOf<const T extends Tuple>(self: T): LastOf<T> {
  return self[self.length - 1] as any
}

export function indexOf<T>(self: readonly [], value: T, fromIndex?: number): undefined
export function indexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined
export function indexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined {
  const index = self.indexOf(value, fromIndex)
  if (index === -1) return undefined

  return index
}

export function lastIndexOf<T>(self: readonly [], value: T, fromIndex?: number): undefined
export function lastIndexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined
export function lastIndexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined {
  const index = self.lastIndexOf(value, fromIndex)
  if (index === -1) return undefined

  return index
}

export function indexesOf<T>(self: readonly [], value: T): []
export function indexesOf<T>(self: readonly T[], value: T): number[]
export function indexesOf<T>(self: readonly T[], value: T): number[] {
  const result = []
  for (let i = 0; i < self.length; i++) {
    if (self[i] === value) {
      result.push(i)
    }
  }
  return result
}

export function maxOf<const T>(self: ReadonlyNonEmptyArray<T>): T
export function maxOf<T>(self: readonly T[]): T | undefined
export function maxOf<T>(self: readonly T[]): T | undefined {
  if (!isNotEmpty(self)) return undefined

  const [firstElement, ...rest] = self
  let candidateElement = firstElement
  for (const element of rest) {
    if (candidateElement < element) {
      candidateElement = element
    }
  }
  return candidateElement
}

export function maxBy<const T, U>(self: ReadonlyNonEmptyArray<T>, by: (element: T) => U): T
export function maxBy<T, U>(self: readonly T[], by: (element: T) => U): T | undefined
export function maxBy<T, U>(self: readonly T[], by: (element: T) => U): T | undefined {
  if (!isNotEmpty(self)) return undefined

  const [firstElement, ...rest] = self
  let candidateElement = firstElement
  let maxValue = by(firstElement)
  for (const element of rest) {
    const value = by(element)
    if (maxValue < value) {
      candidateElement = element
      maxValue = value
    }
  }
  return candidateElement
}

export function minOf<const T>(self: ReadonlyNonEmptyArray<T>): T
export function minOf<T>(self: readonly T[]): T | undefined
export function minOf<T>(self: readonly T[]): T | undefined {
  if (!isNotEmpty(self)) return undefined

  const [firstElement, ...rest] = self
  let candidateElement = firstElement
  for (const element of rest) {
    if (candidateElement > element) {
      candidateElement = element
    }
  }
  return candidateElement
}

export function minBy<const T, U>(self: ReadonlyNonEmptyArray<T>, by: (element: T) => U): T
export function minBy<T, U>(self: readonly T[], by: (element: T) => U): T | undefined
export function minBy<T, U>(self: readonly T[], by: (element: T) => U): T | undefined {
  if (!isNotEmpty(self)) return undefined

  const [firstElement, ...rest] = self
  let candidateElement = firstElement
  let minValue = by(firstElement)
  for (const element of rest) {
    const value = by(element)
    if (minValue > value) {
      candidateElement = element
      minValue = value
    }
  }
  return candidateElement
}

export function elementAt<T>(self: Iterable<T>, n: number): T | undefined {
  const iterator = self[Symbol.iterator]()
  let i: number
  let element: IteratorResult<T>
  for (i = 0, element = iterator.next(); i < n && !element.done; ++i, element = iterator.next()) {}
  iterator.return?.()
  return element.value
}

export function modeOf<const T>(self: ReadonlyNonEmptyArray<T>): T
export function modeOf<const T>(self: readonly T[]): T | undefined
export function modeOf<const T>(self: readonly T[]): T | undefined {
  const map = new Map<T, number>()
  let maxCount = 0
  let candidateValue: T | undefined = undefined
  for (const value of self) {
    const nextCount = (map.get(value) ?? 0) + 1
    if (maxCount < nextCount) {
      maxCount = nextCount
      candidateValue = value
    }
    map.set(value, nextCount)
  }
  return candidateValue
}

export function modeBy<const T, U>(self: ReadonlyNonEmptyArray<T>, by: (_: T) => U): T
export function modeBy<T, U>(self: readonly T[], by: (_: T) => U): T | undefined
export function modeBy<T, U>(self: readonly T[], by: (_: T) => U): T | undefined {
  const map = new Map<U, number>()
  let maxCount = 0
  let candidateValue: T | undefined = undefined
  for (const value of self) {
    const key = by(value)
    const nextCount = (map.get(key) ?? 0) + 1
    if (maxCount < nextCount) {
      maxCount = nextCount
      candidateValue = value
    }
    map.set(key, nextCount)
  }
  return candidateValue
}
