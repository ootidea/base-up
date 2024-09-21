import type { FixedLengthArray } from './Array/FixedLengthArray'
import type { NonEmptyArray } from './Array/MinLengthArray'
import { shuffle } from './Array/other'
import { type Drop, take } from './filter'
import { type IntegerRangeUntil, randomIntegerUntil } from './number/range'
import type { Reverse } from './transform'
import type { Lazy, OMITTED, Unlazy } from './type'

/**
 * @example
 * SequentialNumbersUntil<3> equals [0, 1, 2]
 * SequentialNumbersUntil<2, 5> equals [2, 3, 4]
 * SequentialNumbersUntil<5, 2> equals [5, 4, 3]
 * SequentialNumbersUntil<7, 7> equals []
 * @example
 * SequentialNumbersUntil<-3, 2> equals [-3, -2, -1, 0, 1]
 * SequentialNumbersUntil<3, -2> equals [3, 2, 1, 0, -1]
 * SequentialNumbersUntil<-1, -3> equals [-1, -2]
 * SequentialNumbersUntil<-3, -1> equals [-3, -2]
 * @example
 * SequentialNumbersUntil<2 | -2> equals [0, 1] | [0, -1]
 * SequentialNumbersUntil<1, 3 | 5> equals [1, 2] | [1, 2, 3, 4]
 * SequentialNumbersUntil<0 | 2, 4> equals [0, 1, 2, 3] | [2, 3]
 * SequentialNumbersUntil<number> equals number[]
 */
export type SequentialNumbersUntil<From extends number, To extends number | OMITTED = OMITTED> = To extends number
  ? number extends From
    ? number[]
    : number extends To
      ? number[]
      : From extends From
        ? To extends To
          ? `${From}` extends `-${infer PN extends number}`
            ? `${To}` extends `-${infer PM extends number}`
              ? [...FixedLengthArray<PM>, ...any] extends [...FixedLengthArray<PN>, ...any]
                ? ToNegativeNumbers<Drop<NaturalNumbersUntil<PM>, PN>>
                : ToNegativeNumbers<Reverse<Drop<NaturalNumbersThrough<PN>, NaturalNumbersThrough<PM>['length']>>>
              : [...ToNegativeNumbers<Reverse<PositiveIntegersThrough<PN>>>, ...NaturalNumbersUntil<To>]
            : `${To}` extends `-${infer PM extends number}`
              ? [...Reverse<PositiveIntegersThrough<From>>, ...ToNegativeNumbers<NaturalNumbersUntil<PM>>]
              : [...FixedLengthArray<To>, ...any] extends [...FixedLengthArray<From>, ...any]
                ? Drop<NaturalNumbersUntil<To>, From>
                : Reverse<Drop<NaturalNumbersThrough<From>, NaturalNumbersThrough<To>['length']>>
          : never
        : never
  : SequentialNumbersUntil<0, From>

/**
 * @example
 * SequentialNumbersThrough<3> equals [0, 1, 2, 3]
 * SequentialNumbersThrough<2, 5> equals [2, 3, 4, 5]
 * SequentialNumbersThrough<5, 2> equals [5, 4, 3, 2]
 * SequentialNumbersThrough<7, 7> equals [7]
 * @example
 * SequentialNumbersThrough<-3, 2> equals [-3, -2, -1, 0, 1, 2]
 * SequentialNumbersThrough<3, -2> equals [3, 2, 1, 0, -1, -2]
 * SequentialNumbersThrough<-1, -3> equals [-1, -2, -3]
 * SequentialNumbersThrough<-3, -1> equals [-3, -2, -1]
 * @example
 * SequentialNumbersThrough<2 | -2> equals [0, 1, 2] | [0, -1, -2]
 * SequentialNumbersThrough<1, 3 | 5> equals [1, 2, 3] | [1, 2, 3, 4, 5]
 * SequentialNumbersThrough<0 | 2, 4> equals [0, 1, 2, 3, 4] | [2, 3, 4]
 * SequentialNumbersThrough<number> equals [number, ...number[]] | [...number[], number]
 */
export type SequentialNumbersThrough<From extends number, To extends number | OMITTED = OMITTED> = To extends number
  ? number extends From
    ? NonEmptyArray<number>
    : number extends To
      ? NonEmptyArray<number>
      : From extends From
        ? To extends To
          ? `${From}` extends `-${infer PN extends number}`
            ? `${To}` extends `-${infer PM extends number}`
              ? [...FixedLengthArray<PM>, ...any] extends [...FixedLengthArray<PN>, ...any]
                ? ToNegativeNumbers<Drop<NaturalNumbersThrough<PM>, PN>>
                : ToNegativeNumbers<Reverse<Drop<NaturalNumbersThrough<PN>, PM>>>
              : [...ToNegativeNumbers<Reverse<PositiveIntegersThrough<PN>>>, ...NaturalNumbersThrough<To>]
            : `${To}` extends `-${infer PM extends number}`
              ? [...Reverse<PositiveIntegersThrough<From>>, ...ToNegativeNumbers<NaturalNumbersThrough<PM>>]
              : [...FixedLengthArray<To>, ...any] extends [...FixedLengthArray<From>, ...any]
                ? Drop<NaturalNumbersThrough<To>, From>
                : Reverse<Drop<NaturalNumbersThrough<From>, To>>
          : never
        : never
  : SequentialNumbersThrough<0, From>

/**
 * @example
 * NaturalNumbersUntil<3> equals [0, 1, 2]
 * NaturalNumbersUntil<0> equals []
 * NaturalNumbersUntil<1 | 2> equals [0] | [0, 1]
 * NaturalNumbersUntil<number> equals number[]
 */
type NaturalNumbersUntil<N extends number> = number extends N
  ? number[]
  : N extends N
    ? Unlazy<_NaturalNumbersUntil<N, []>>
    : never
type _NaturalNumbersUntil<N extends number, Acc extends readonly unknown[]> = Acc['length'] extends N
  ? Acc
  : Lazy<_NaturalNumbersUntil<N, [...Acc, Acc['length']]>>

/**
 * @example
 * NaturalNumbersThrough<3> equals [0, 1, 2, 3]
 * NaturalNumbersThrough<0> equals [0]
 * NaturalNumbersThrough<1 | 2> equals [0, 1] | [0, 1, 2]
 * NaturalNumbersThrough<number> equals number[]
 */
type NaturalNumbersThrough<N extends number> = number extends N
  ? number[]
  : N extends N
    ? Unlazy<_NaturalNumbersThrough<FixedLengthArray<N>>>
    : never
type _NaturalNumbersThrough<
  Size extends readonly unknown[],
  R extends readonly unknown[] = [],
> = Size extends readonly [any, ...infer L extends readonly unknown[]]
  ? Lazy<_NaturalNumbersThrough<L, [Size['length'], ...R]>>
  : [0, ...R]

/**
 * @example
 * PositiveIntegersUntil<3> equals [1, 2]
 * PositiveIntegersUntil<1 | 2> equals [] | [1]
 * PositiveIntegersUntil<0> equals []
 * PositiveIntegersUntil<number> equals number[]
 */
type PositiveIntegersUntil<N extends number> = number extends N
  ? number[]
  : N extends N
    ? _PositiveIntegersUntil<Drop<FixedLengthArray<N>, 1>, []>
    : never
type _PositiveIntegersUntil<Size extends readonly unknown[], Acc extends readonly unknown[]> = Acc extends Size
  ? Acc
  : _PositiveIntegersUntil<Size, [...Acc, [1, ...Acc]['length']]>

/**
 * @example
 * PositiveIntegersThrough<3> equals [1, 2, 3]
 * PositiveIntegersThrough<1 | 2> equals [1] | [1, 2]
 * PositiveIntegersThrough<0> equals []
 * PositiveIntegersThrough<number> equals number[]
 */
type PositiveIntegersThrough<N extends number> = number extends N
  ? number[]
  : N extends 0
    ? []
    : N extends N
      ? _PositiveIntegersThrough<FixedLengthArray<N>>
      : never
type _PositiveIntegersThrough<
  Size extends readonly unknown[],
  R extends readonly unknown[] = [],
> = Size extends readonly [any, ...infer L] ? _PositiveIntegersThrough<L, [Size['length'], ...R]> : R

/**
 * @example
 * ToNegativeNumbers<[1, 2, -3]> equals [-1, -2, -3]
 * ToNegativeNumbers<[0]> equals [0]
 * ToNegativeNumbers<[]> equals []
 */
type ToNegativeNumbers<T extends readonly number[]> = T extends readonly [
  infer H extends number,
  ...infer L extends readonly number[],
]
  ? H extends 0
    ? [0, ...ToNegativeNumbers<L>]
    : `-${H}` extends `${infer N extends number}`
      ? [N, ...ToNegativeNumbers<L>]
      : [H, ...ToNegativeNumbers<L>]
  : []

/**
 * @example
 * sequentialNumbersUntil(3) returns [0, 1, 2]
 * sequentialNumbersUntil(3) is typed as [0, 1, 2]
 * @example
 * sequentialNumbersUntil(0) returns []
 * sequentialNumbersUntil(0) is typed as []
 * @example
 * sequentialNumbersUntil(4 as number) returns [0, 1, 2, 3]
 * sequentialNumbersUntil(4 as number) is typed as number[]
 */
export function sequentialNumbersUntil<To extends number>(to: To): SequentialNumbersUntil<To>
export function sequentialNumbersUntil<From extends number, To extends number>(
  from: From,
  to: To,
): SequentialNumbersUntil<From, To>
export function sequentialNumbersUntil<N extends number, M extends number>(n: N, m?: M): number[] {
  const [from, to] = m === undefined ? [0, n] : [n, m]

  const result = []
  if (from < to) {
    for (let i = from; i < to; i++) {
      result.push(i)
    }
  } else {
    for (let i = from; i > to; i--) {
      result.push(i)
    }
  }
  return result as any
}
export function* sequentialNumbersUntilIterable(n: number): Iterable<number> {
  for (let i = 0; i < n; i++) {
    yield i
  }
}

/**
 * @example
 * sequentialNumbersThrough(3) returns [0, 1, 2, 3]
 * sequentialNumbersThrough(3) is typed as [0, 1, 2, 3]
 * @example
 * sequentialNumbersThrough(0) returns [0]
 * sequentialNumbersThrough(0) is typed as [0]
 * @example
 * sequentialNumbersThrough(4 as number) returns [0, 1, 2, 3, 4]
 * sequentialNumbersThrough(4 as number) is typed as number[]
 */
export function sequentialNumbersThrough<To extends number>(to: To): SequentialNumbersThrough<To>
export function sequentialNumbersThrough<From extends number, To extends number>(
  from: From,
  to: To,
): SequentialNumbersThrough<From, To>
export function sequentialNumbersThrough<N extends number, M extends number>(n: N, m?: M): number[] {
  const [from, to] = m === undefined ? [0, n] : [n, m]

  const result = []
  if (from < to) {
    for (let i = from; i <= to; i++) {
      result.push(i)
    }
  } else {
    for (let i = from; i >= to; i--) {
      result.push(i)
    }
  }
  return result as any
}

/**
 * Generate an array of unique random natural numbers.
 * @example
 * uniqueRandomIntegersUntil(2, 2) returns [0, 1] or [1, 0]
 * uniqueRandomIntegersUntil(2, 1) returns [0] or [1]
 * uniqueRandomIntegersUntil(3, 1) returns [0] or [1] or [2]
 * uniqueRandomIntegersUntil(3, 2) returns [0, 1] or [0, 2] or [1, 0] or [1, 2] or [2, 0] or [2, 1]
 * @example
 * uniqueRandomIntegersUntil(2, 2) is typed as [0 | 1, 0 | 1]
 */
export function uniqueRandomIntegersUntil<const N extends number, const M extends number>(
  upperBound: N,
  length: M,
): FixedLengthArray<M, IntegerRangeUntil<N>> {
  if (length / upperBound < 0.4) {
    return retryWhile(upperBound, length)
  } else {
    return takeShuffle(upperBound, length)
  }
}
function takeShuffle<const N extends number, const M extends number>(
  upperBound: N,
  length: M,
): FixedLengthArray<M, IntegerRangeUntil<N>> {
  return take(shuffle(sequentialNumbersUntil(upperBound)), length) as any
}
function retryWhile<const N extends number, const M extends number>(
  upperBound: N,
  length: M,
): FixedLengthArray<M, IntegerRangeUntil<N>> {
  const set = new Set<number>()
  const result: number[] = []
  while (result.length < length) {
    const randomInteger = randomIntegerUntil(upperBound)
    if (!set.has(randomInteger)) {
      result.push(randomInteger)
      set.add(randomInteger)
    }
  }
  return result as any
}

/**
 * @example
 * Repeat<3, ['a', 'b']> is typed as ['a', 'b', 'a', 'b', 'a', 'b']
 * Repeat<0, ['a', 'b']> is typed as []
 * @example
 * Repeat<0 | 1, ['a', 'b']> is typed as [] | ['a', 'b']
 * Repeat<number, ['a', 'b']> is typed as ('a' | 'b')[]
 */
export type Repeat<N extends number, A extends readonly unknown[]> = number extends N
  ? A[number][]
  : N extends N
    ? _Repeat<N, A>
    : never
type _Repeat<
  N extends number,
  A extends readonly unknown[],
  Size extends readonly unknown[] = [],
  R extends readonly unknown[] = [],
> = Size['length'] extends N ? R : _Repeat<N, A, [1, ...Size], [...R, ...A]>
/**
 * @example
 * RepeatString<'Abc', 2> equals 'AbcAbc'
 * RepeatString<'A', 0> equals ''
 * @example
 * RepeatString<'A' | 'B', 2> equals 'AA' | 'AB' | 'BA' | 'BB'
 * RepeatString<'A', 1 | 3> equals 'A' | 'AAA'
 * @example
 * RepeatString<string, 2> equals string
 * RepeatString<'A', number> equals string
 */
export type RepeatString<S extends string, N extends number> = string extends S
  ? string
  : number extends N
    ? string
    : _RepeatString<S, FixedLengthArray<N>>
type _RepeatString<S extends string, Size extends readonly unknown[]> = Size extends [any, ...infer L]
  ? `${S}${_RepeatString<S, L>}`
  : ''

/**
 * @example
 * repeat(3, 'a') returns ['a', 'a', 'a']
 * repeat(2, true, false) returns [true, false, true, false]
 */
export function repeat<N extends number, const T extends readonly unknown[]>(count: N, ...values: T): Repeat<N, T> {
  return Array.from({ length: count * values.length }, (_, i) => values[i % values.length]) as any
}
/**
 * @example
 * repeatIterable('a') yields 'a', 'a', 'a', ...
 * repeatIterable(1, 2) yields 1, 2, 1, 2, ...
 */
export function* repeatIterable<const T extends readonly unknown[]>(...values: T): Iterable<T[number]> {
  while (true) yield* values
}

export function repeatApply<N extends number, T>(length: N, first: T, f: (_: T) => T): FixedLengthArray<N, T> {
  if (length === 0) return [] as any

  const result: T[] = [first]
  let value = first
  for (let i = 1; i < length; i++) {
    value = f(value)
    result.push(value)
  }
  return result as any
}
export function* repeatApplyIterable<T>(first: T, f: (_: T) => T): Iterable<T> {
  let value = first
  while (true) {
    yield value
    value = f(value)
  }
}

/**
 * Function that improves the type of Object.fromEntries.
 *
 * @example
 * fromEntries([['a', 1], ['b', 2]]) returns { a: 1, b: 2 }
 * fromEntries([['a', 1], ['b', 2]]) is typed as Record<'a' | 'b', 1 | 2>
 * @example
 * fromEntries([]) returns {}
 * fromEntries([]) is typed as Record<never, never>
 */
export function fromEntries<const T extends readonly [any, any]>(entries: Iterable<T>): Record<T[0], T[1]> {
  return Object.fromEntries(entries) as any
}
