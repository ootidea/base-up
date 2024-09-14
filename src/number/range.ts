import { FixedLengthArray } from '../Array/FixedLengthArray'
import { Repeat } from '../generate'
import { ToNumber } from '../string/other'
import { OMITTED } from '../type'
import { IsOneOf } from '../typePredicate'
import { Digit, Infinity, Negate, NegativeInfinity, ToDigitArray } from './other'

/**
 * @example
 * IntegerRangeUntil<3> equals 0 | 1 | 2
 * IntegerRangeUntil<4, 8> equals 4 | 5 | 6 | 7
 * IntegerRangeUntil<5, 3> equals 5 | 4
 * @example
 * IntegerRangeUntil<2, -2> equals 2 | 1 | 0 | -1
 * IntegerRangeUntil<-2, 2> equals -2 | -1 | 0 | 1
 * @example
 * IntegerRangeUntil<1, 1> equals never
 * IntegerRangeUntil<0> equals never
 * @example
 * IntegerRangeUntil<2 | 4> equals 0 | 1 | 2 | 3
 * IntegerRangeUntil<number, 9> equals number
 * IntegerRangeUntil<9, number> equals number
 */
export type IntegerRangeUntil<N extends number, M extends number | OMITTED = OMITTED> = N extends N
  ? M extends M
    ? IsOneOf<N, [number, any, Infinity, NegativeInfinity]> extends true
      ? number
      : M extends number
      ? `${N}` extends `-${infer PN extends number}`
        ? `${M}` extends `-${infer PM extends number}`
          ? [...FixedLengthArray<PN>, ...any] extends [...FixedLengthArray<PM>, ...any]
            ? Negate<Exclude<NaturalNumbersFrom0Through<PN>, NaturalNumbersFrom0Through<PM>>>
            : Negate<Exclude<NaturalNumbersFrom0Until<PM>, NaturalNumbersFrom0Until<PN>>>
          : Negate<NaturalNumbersFrom0Through<PN>> | NaturalNumbersFrom0Until<M>
        : `${M}` extends `-${infer PM extends number}`
        ? NaturalNumbersFrom0Through<N> | Negate<NaturalNumbersFrom0Until<PM>>
        : [...FixedLengthArray<N>, ...any] extends [...FixedLengthArray<M>, ...any]
        ? Exclude<NaturalNumbersFrom0Through<N>, NaturalNumbersFrom0Through<M>>
        : Exclude<NaturalNumbersFrom0Until<M>, NaturalNumbersFrom0Until<N>>
      : IntegerRangeUntil<0, N>
    : never
  : never

/**
 * @example
 * IntegerRangeThrough<3> equals 0 | 1 | 2 | 3
 * IntegerRangeThrough<4, 8> equals 4 | 5 | 6 | 7 | 8
 * IntegerRangeThrough<5, 3> equals 5 | 4 | 3
 * @example
 * IntegerRangeThrough<2, -2> equals 2 | 1 | 0 | -1 | -2
 * IntegerRangeThrough<-2, 2> equals -2 | -1 | 0 | 1 | 2
 * @example
 * IntegerRangeThrough<1, 1> equals 1
 * IntegerRangeThrough<0> equals 0
 * @example
 * IntegerRangeThrough<2 | 4> equals 0 | 1 | 2 | 3 | 4
 * IntegerRangeThrough<number, 9> equals number
 * IntegerRangeThrough<9, number> equals number
 */
export type IntegerRangeThrough<N extends number, M extends number | OMITTED = OMITTED> = N extends N
  ? M extends M
    ? IsOneOf<N, [number, any, Infinity, NegativeInfinity]> extends true
      ? number
      : M extends number
      ? `${N}` extends `-${infer PN extends number}`
        ? `${M}` extends `-${infer PM extends number}`
          ? [...FixedLengthArray<PN>, ...any] extends [...FixedLengthArray<PM>, ...any]
            ? Negate<Exclude<NaturalNumbersFrom0Through<PN>, NaturalNumbersFrom0Until<PM>>>
            : Negate<Exclude<NaturalNumbersFrom0Through<PM>, NaturalNumbersFrom0Until<PN>>>
          : Negate<NaturalNumbersFrom0Through<PN>> | NaturalNumbersFrom0Through<M>
        : `${M}` extends `-${infer PM extends number}`
        ? NaturalNumbersFrom0Through<N> | Negate<NaturalNumbersFrom0Through<PM>>
        : [...FixedLengthArray<N>, ...any] extends [...FixedLengthArray<M>, ...any]
        ? Exclude<NaturalNumbersFrom0Through<N>, NaturalNumbersFrom0Until<M>>
        : Exclude<NaturalNumbersFrom0Through<M>, NaturalNumbersFrom0Until<N>>
      : IntegerRangeThrough<0, N>
    : never
  : never

export type DigitToRangeUntil = {
  ['0']: never
  ['1']: '0'
  ['2']: '0' | '1'
  ['3']: '0' | '1' | '2'
  ['4']: '0' | '1' | '2' | '3'
  ['5']: '0' | '1' | '2' | '3' | '4'
  ['6']: '0' | '1' | '2' | '3' | '4' | '5'
  ['7']: '0' | '1' | '2' | '3' | '4' | '5' | '6'
  ['8']: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7'
  ['9']: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
}

/**
 * Generate a union type from 0 to the given number minus 1. It's orders of magnitude faster compared to a naive implementation.
 * @example
 * NaturalNumbersFrom0Until<0> equals never
 * NaturalNumbersFrom0Until<1> equals 0
 * NaturalNumbersFrom0Until<2> equals 0 | 1
 * NaturalNumbersFrom0Until<10000> equals 0 | 1 | 2 | ... | 9999
 */
export type NaturalNumbersFrom0Until<N extends number> = ToNumber<_NaturalNumbersFrom0Until<ToDigitArray<N>>>
type _NaturalNumbersFrom0Until<DigitArray extends readonly Digit[]> = DigitArray extends readonly [
  infer D extends Digit,
]
  ? `${DigitToRangeUntil[D]}`
  : DigitArray extends readonly [infer H extends Digit, ...infer L extends readonly Digit[]]
  ?
      | `${DigitToRangeUntil[H]}${Repeat.String<Digit, L['length']> extends infer S extends string ? S : never}`
      | `${H}${_NaturalNumbersFrom0Until<L>}`
  : ''

/**
 * Generate a union type from 0 to the given number. It's orders of magnitude faster compared to a naive implementation.
 * @example
 * NaturalNumbersFrom0Through<0> equals 0
 * NaturalNumbersFrom0Through<1> equals 1
 * NaturalNumbersFrom0Through<2> equals 0 | 1 | 2
 * NaturalNumbersFrom0Through<10000> equals 0 | 1 | 2 | ... | 10000
 */
export type NaturalNumbersFrom0Through<N extends number> = NaturalNumbersFrom0Until<N> | N

/**
 * Determine if the given value is in the given range.
 * @example
 * isInIntegerRangeUntil(50, 0, 100) returns true
 * isInIntegerRangeUntil(101, 0, 100) returns false
 * @example
 */
export function isInIntegerRangeUntil<N extends number, M extends number>(
  value: number,
  n: N,
  m: M,
): value is IntegerRangeUntil<N, M> {
  if (!Number.isInteger(n)) throw new TypeError(`${n} is not an integer`)
  if (!Number.isInteger(m)) throw new TypeError(`${m} is not an integer`)

  return Number.isInteger(value) && Math.min(n, m) <= value && value < Math.max(n, m)
}
export namespace isInIntegerRangeUntil {
  /**
   * filter(someNumbers, isInIntegerRangeUntil.defer(0, 5))
   */
  export function defer<N extends number, M extends number>(
    n: N,
    m: M,
  ): (value: number) => value is IntegerRangeUntil<N, M> {
    return (value): value is IntegerRangeUntil<N, M> => isInIntegerRangeUntil(value, n, m)
  }
}

export function isInIntegerRangeThrough<N extends number, M extends number>(
  value: number,
  n: N,
  m: M,
): value is IntegerRangeThrough<N, M> {
  if (!Number.isInteger(n)) throw new TypeError(`${n} is not an integer`)
  if (!Number.isInteger(m)) throw new TypeError(`${m} is not an integer`)

  return Number.isInteger(value) && Math.min(n, m) <= value && value <= Math.max(n, m)
}
export namespace isInIntegerRangeThrough {
  export function defer<N extends number, M extends number>(
    n: N,
    m: M,
  ): (value: number) => value is IntegerRangeThrough<N, M> {
    return (value): value is IntegerRangeThrough<N, M> => isInIntegerRangeThrough(value, n, m)
  }
}

/**
 * @example
 * randomIntegerUntil(3) returns 0, 1 or 2
 * randomIntegerUntil(3) is typed as 0 | 1 | 2
 * randomIntegerUntil(1, 4) returns 1, 2 or 3
 * randomIntegerUntil(1, 4) is typed as 1 | 2 | 3
 * @example
 * randomIntegerUntil(-2) returns 0 or -1
 * randomIntegerUntil(-2) is typed as 0 | -1
 * @example
 * randomIntegerUntil(0) throws RangeError
 * randomIntegerUntil(0) is typed as never
 * randomIntegerUntil(5, 5) throws RangeError
 * randomIntegerUntil(5, 5) is typed as never
 */
export function randomIntegerUntil<To extends number>(to: To): IntegerRangeUntil<To>
export function randomIntegerUntil<From extends number, To extends number>(
  from: From,
  to: To,
): IntegerRangeUntil<From, To>
export function randomIntegerUntil<N extends number, M extends number>(first: N, second?: M): number {
  const [from, to] = second === undefined ? [0, first] : [first, second]
  if (from === to) {
    throw RangeError(`The arguments of randomIntegerUntil are the same value(${to}).\nMust be different values.`)
  }
  return Math.trunc(Math.random() * (to - from)) + from
}

export function randomIntegerThrough<N extends number>(end: N): IntegerRangeThrough<N>
export function randomIntegerThrough<N extends number, M extends number>(start: N, end: M): IntegerRangeThrough<N, M>
export function randomIntegerThrough<N extends number, M extends number>(first: N, second?: M): number {
  const from = second === undefined ? 0 : first
  const to = second === undefined ? first : second
  return Math.trunc(Math.random() * (to + 1 - from)) + from
}
