import type { FixedLengthArray } from '../Array/FixedLengthArray'
import type { Equals } from '../typePredicate'
import type { Digit } from './other'
import type { DigitToRangeUntil } from './range'

/**
 * Type-level function of N <= M.
 * It's orders of magnitude faster compared to a naive implementation.
 * @param N - A natural number literal type
 * @param M - A natural number literal type
 * @returns true if N <= M, false otherwise
 *
 * @example
 * IsAtMostNaturalNumber<3, 4> equals true
 * IsAtMostNaturalNumber<4, 4> equals true
 * IsAtMostNaturalNumber<5, 4> equals false
 * IsAtMostNaturalNumber<9, 123> equals true
 * @example
 * IsAtMostNaturalNumber<1234567, 1234560> equals false
 */
export type IsAtMostNaturalNumber<N extends number, M extends number> = Equals<N, M> extends true
  ? true
  : _IsAtMostNaturalNumber<`${N}`, `${M}`>
type _IsAtMostNaturalNumber<
  Lhs extends string,
  Rhs extends string,
  LA extends readonly Digit[] = [],
  RA extends readonly Digit[] = [],
> = Lhs extends `${infer LH extends Digit}${infer LL}`
  ? Rhs extends `${infer RH extends Digit}${infer RL}`
    ? _IsAtMostNaturalNumber<LL, RL, [LH, ...LA], [RH, ...RA]>
    : false
  : Rhs extends `${infer RH extends Digit}${infer RL}`
    ? true
    : _IsAtMostNaturalNumberLexicographic<LA, RA>
/**
 * @example
 * _IsAtMostNaturalNumberLexicographic<['4'], ['4']> equals true
 * _IsAtMostNaturalNumberLexicographic<['1', '2'], ['4']> equals true
 * _IsAtMostNaturalNumberLexicographic<['1', '2'], ['1']> equals false
 * _IsAtMostNaturalNumberLexicographic<['1', '2'], ['1', '5']> equals true
 * _IsAtMostNaturalNumberLexicographic<['1', '2'], ['0', '5']> equals false
 * _IsAtMostNaturalNumberLexicographic<[], ['0']> equals true
 */
type _IsAtMostNaturalNumberLexicographic<
  Lhs extends readonly Digit[],
  Rhs extends readonly Digit[],
> = Lhs extends readonly [infer LH extends Digit, ...infer LL extends readonly Digit[]]
  ? Rhs extends readonly [infer RH extends Digit, ...infer RL extends readonly Digit[]]
    ? Equals<LH, RH, _IsAtMostNaturalNumberLexicographic<LL, RL>, IsLessThanDigit<LH, RH>>
    : false
  : true

type IsLessThanDigit<Lhs extends Digit, Rhs extends Digit> = Lhs extends DigitToRangeUntil[Rhs] ? true : false

/**
 * @example
 * Min<0, 3> equals 0
 * Min<2, 2> equals 2
 * Min<-1, 2> equals -1
 * Min<-1, -4> equals -4
 */
export type Min<N extends number, M extends number> = `${N}` extends `-${infer PN extends number}`
  ? `${M}` extends `-${infer PM extends number}`
    ? [...FixedLengthArray<PN>, ...any] extends [...FixedLengthArray<PM>, ...any]
      ? N
      : M
    : N
  : `${M}` extends `-${infer PM extends number}`
    ? M
    : [...FixedLengthArray<N>, ...any] extends [...FixedLengthArray<M>, ...any]
      ? M
      : N

/**
 * @example
 * Max<0, 3> equals 3
 * Max<2, 2> equals 2
 * Max<-1, 2> equals 2
 * Max<-1, -4> equals -1
 */
export type Max<N extends number, M extends number> = `${N}` extends `-${infer PN extends number}`
  ? `${M}` extends `-${infer PM extends number}`
    ? [...FixedLengthArray<PN>, ...any] extends [...FixedLengthArray<PM>, ...any]
      ? M
      : N
    : M
  : `${M}` extends `-${infer PM extends number}`
    ? N
    : [...FixedLengthArray<N>, ...any] extends [...FixedLengthArray<M>, ...any]
      ? N
      : M

/**
 * The clamp function restricts a given input value to a specified range or interval, by constraining it to a minimum and maximum value.
 * If the input value is within the specified range, the function returns the input value itself.
 * However, if the input value is outside of the specified range, the function returns the nearest boundary value that it is constrained to.
 *
 * @example
 * clamp(0, 50, 100) returns 50
 * clamp(0, 110, 100) returns 100
 * clamp(0, -20, 100) returns 0
 * @example
 * clamp(0, Infinity, 100) returns 100
 * clamp(0, -Infinity, 100) returns 0
 * @example
 * clamp(0, 50, Infinity) returns 50
 * clamp(-Infinity, 50, 100) returns 50
 */
export function clamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(value, max))
}
