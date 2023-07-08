import { FixedLengthArray } from './Array/FixedLengthArray'
import { NonEmptyArray } from './Array/MinLengthArray'
import { shuffle, Tuple } from './Array/other'
import { IntegerRangeUntil, randomIntegerUntil } from './number/range'
import { Drop, Reverse, take } from './transform'
import { Lazy, Unlazy } from './type'

/**
 * @example
 * RangeUntil<3> is equivalent to [0, 1, 2]
 * RangeUntil<2, 5> is equivalent to [2, 3, 4]
 * RangeUntil<5, 2> is equivalent to [5, 4, 3]
 * RangeUntil<7, 7> is equivalent to []
 * @example
 * RangeUntil<-3, 2> is equivalent to [-3, -2, -1, 0, 1]
 * RangeUntil<3, -2> is equivalent to [3, 2, 1, 0, -1]
 * RangeUntil<-1, -3> is equivalent to [-1, -2]
 * RangeUntil<-3, -1> is equivalent to [-3, -2]
 * @example
 * RangeUntil<2 | -2> is equivalent to [0, 1] | [0, -1]
 * RangeUntil<1, 3 | 5> is equivalent to [1, 2] | [1, 2, 3, 4]
 * RangeUntil<0 | 2, 4> is equivalent to [0, 1, 2, 3] | [2, 3]
 * RangeUntil<number> is equivalent to number[]
 */
export type RangeUntil<From extends number, To extends number | undefined = undefined> = To extends number
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
  : RangeUntil<0, From>

/**
 * @example
 * RangeThrough<3> is equivalent to [0, 1, 2, 3]
 * RangeThrough<2, 5> is equivalent to [2, 3, 4, 5]
 * RangeThrough<5, 2> is equivalent to [5, 4, 3, 2]
 * RangeThrough<7, 7> is equivalent to [7]
 * @example
 * RangeThrough<-3, 2> is equivalent to [-3, -2, -1, 0, 1, 2]
 * RangeThrough<3, -2> is equivalent to [3, 2, 1, 0, -1, -2]
 * RangeThrough<-1, -3> is equivalent to [-1, -2, -3]
 * RangeThrough<-3, -1> is equivalent to [-3, -2, -1]
 * @example
 * RangeThrough<2 | -2> is equivalent to [0, 1, 2] | [0, -1, -2]
 * RangeThrough<1, 3 | 5> is equivalent to [1, 2, 3] | [1, 2, 3, 4, 5]
 * RangeThrough<0 | 2, 4> is equivalent to [0, 1, 2, 3, 4] | [2, 3, 4]
 * RangeThrough<number> is equivalent to [number, ...number[]] | [...number[], number]
 */
export type RangeThrough<From extends number, To extends number | undefined = undefined> = To extends number
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
  : RangeThrough<0, From>

/**
 * @example
 * NaturalNumbersUntil<3> is equivalent to [0, 1, 2]
 * NaturalNumbersUntil<0> is equivalent to []
 * NaturalNumbersUntil<1 | 2> is equivalent to [0] | [0, 1]
 * NaturalNumbersUntil<number> is equivalent to number[]
 */
type NaturalNumbersUntil<N extends number> = number extends N
  ? number[]
  : N extends N
  ? Unlazy<_NaturalNumbersUntil<N, []>>
  : never
type _NaturalNumbersUntil<N extends number, Acc extends Tuple> = Acc['length'] extends N
  ? Acc
  : Lazy<_NaturalNumbersUntil<N, [...Acc, Acc['length']]>>

/**
 * @example
 * NaturalNumbersThrough<3> is equivalent to [0, 1, 2, 3]
 * NaturalNumbersThrough<0> is equivalent to [0]
 * NaturalNumbersThrough<1 | 2> is equivalent to [0, 1] | [0, 1, 2]
 * NaturalNumbersThrough<number> is equivalent to number[]
 */
type NaturalNumbersThrough<N extends number> = number extends N
  ? number[]
  : N extends N
  ? Unlazy<_NaturalNumbersThrough<FixedLengthArray<N>>>
  : never
type _NaturalNumbersThrough<Size extends Tuple, R extends Tuple = []> = Size extends readonly [
  any,
  ...infer L extends Tuple
]
  ? Lazy<_NaturalNumbersThrough<L, [Size['length'], ...R]>>
  : [0, ...R]

/**
 * @example
 * PositiveIntegersUntil<3> is equivalent to [1, 2]
 * PositiveIntegersUntil<1 | 2> is equivalent to [] | [1]
 * PositiveIntegersUntil<0> is equivalent to []
 * PositiveIntegersUntil<number> is equivalent to number[]
 */
type PositiveIntegersUntil<N extends number> = number extends N
  ? number[]
  : N extends N
  ? _PositiveIntegersUntil<Drop<FixedLengthArray<N>, 1>, []>
  : never
type _PositiveIntegersUntil<Size extends Tuple, Acc extends Tuple> = Acc extends Size
  ? Acc
  : _PositiveIntegersUntil<Size, [...Acc, [1, ...Acc]['length']]>

/**
 * @example
 * PositiveIntegersThrough<3> is equivalent to [1, 2, 3]
 * PositiveIntegersThrough<1 | 2> is equivalent to [1] | [1, 2]
 * PositiveIntegersThrough<0> is equivalent to []
 * PositiveIntegersThrough<number> is equivalent to number[]
 */
type PositiveIntegersThrough<N extends number> = number extends N
  ? number[]
  : N extends 0
  ? []
  : N extends N
  ? _PositiveIntegersThrough<FixedLengthArray<N>>
  : never
type _PositiveIntegersThrough<Size extends Tuple, R extends Tuple = []> = Size extends readonly [any, ...infer L]
  ? _PositiveIntegersThrough<L, [Size['length'], ...R]>
  : R

/**
 * @example
 * ToNegativeNumbers<[1, 2, -3]> is equivalent to [-1, -2, -3]
 * ToNegativeNumbers<[0]> is equivalent to [0]
 * ToNegativeNumbers<[]> is equivalent to []
 */
type ToNegativeNumbers<T extends readonly number[]> = T extends readonly [
  infer H extends number,
  ...infer L extends readonly number[]
]
  ? H extends 0
    ? [0, ...ToNegativeNumbers<L>]
    : `-${H}` extends `${infer N extends number}`
    ? [N, ...ToNegativeNumbers<L>]
    : [H, ...ToNegativeNumbers<L>]
  : []

/**
 * @example
 * Protruded<[any], [bigint, never, void]> is equivalent to [never, void]
 * Protruded<[bigint, never, void], [any]> is equivalent to [never, void]
 * Protruded<[any, any, any], [bigint, never, void]> is equivalent to []
 * Protruded<FixedLengthArray<1>, FixedLengthArray<4>>['length'] is equivalent to 3
 */
export type Protruded<T extends Tuple, U extends Tuple> = T extends [any, ...infer TL]
  ? U extends [any, ...infer UL]
    ? Protruded<TL, UL>
    : T
  : U extends [any, ...infer UL]
  ? U
  : []

/**
 * @example
 * rangeUntil(3) returns [0, 1, 2]
 * rangeUntil(3) is typed as [0, 1, 2]
 * @example
 * rangeUntil(0) returns []
 * rangeUntil(0) is typed as []
 * @example
 * rangeUntil(4 as number) returns [0, 1, 2, 3]
 * rangeUntil(4 as number) is typed as number[]
 */
export function rangeUntil<To extends number>(to: To): RangeUntil<To>
export function rangeUntil<From extends number, To extends number>(from: From, to: To): RangeUntil<From, To>
export function rangeUntil<N extends number, M extends number>(n: N, m?: M): number[] {
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
export namespace rangeUntil {
  export function* Iterable(n: number): Iterable<number> {
    for (let i = 0; i < n; i++) {
      yield i
    }
  }
}

/**
 * @example
 * rangeThrough(3) returns [0, 1, 2, 3]
 * rangeThrough(3) is typed as [0, 1, 2, 3]
 * @example
 * rangeThrough(0) returns [0]
 * rangeThrough(0) is typed as [0]
 * @example
 * rangeThrough(4 as number) returns [0, 1, 2, 3, 4]
 * rangeThrough(4 as number) is typed as number[]
 */
export function rangeThrough<To extends number>(to: To): RangeThrough<To>
export function rangeThrough<From extends number, To extends number>(from: From, to: To): RangeThrough<From, To>
export function rangeThrough<N extends number, M extends number>(n: N, m?: M): number[] {
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
  length: M
): FixedLengthArray<M, IntegerRangeUntil<N>> {
  if (length / upperBound < 0.4) {
    return retryWhile(upperBound, length)
  } else {
    return takeShuffle(upperBound, length)
  }
}
function takeShuffle<const N extends number, const M extends number>(
  upperBound: N,
  length: M
): FixedLengthArray<M, IntegerRangeUntil<N>> {
  return take(shuffle(rangeUntil(upperBound)), length) as any
}
function retryWhile<const N extends number, const M extends number>(
  upperBound: N,
  length: M
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
 * RepeatArray<3, ['a', 'b']> is typed as ['a', 'b', 'a', 'b', 'a', 'b']
 * RepeatArray<0, ['a', 'b']> is typed as []
 * @example
 * RepeatArray<0 | 1, ['a', 'b']> is typed as [] | ['a', 'b']
 * RepeatArray<number, ['a', 'b']> is typed as readonly ('a' | 'b')[]
 */
export type RepeatArray<N extends number, A extends Tuple> = number extends N
  ? readonly A[number][]
  : N extends N
  ? _RepeatArray<N, A>
  : never
type _RepeatArray<
  N extends number,
  A extends Tuple,
  Size extends Tuple = [],
  R extends Tuple = []
> = Size['length'] extends N ? R : _RepeatArray<N, A, [1, ...Size], [...R, ...A]>

/**
 * @example
 * repeat(3, 'a') returns ['a', 'a', 'a']
 * repeat(2, true, false) returns [true, false, true, false]
 */
export function repeat<N extends number, const T extends Tuple>(count: N, ...values: T): RepeatArray<N, T> {
  return Array.from({ length: count * values.length }, (_, i) => values[i % values.length]) as any
}
export namespace repeat {
  /**
   * @example
   * repeat.Iterable('a') yields 'a', 'a', 'a', ...
   * repeat.Iterable(1, 2) yields 1, 2, 1, 2, ...
   */
  export function* Iterable<const T extends Tuple>(...values: T): Iterable<T[number]> {
    while (true) yield* values
  }
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
export namespace repeatApply {
  export function* Iterator<T>(first: T, f: (_: T) => T): Iterable<T> {
    let value = first
    while (true) {
      yield value
      value = f(value)
    }
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
