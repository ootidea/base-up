import { FixedLengthArray } from '../Array/FixedLengthArray'
import { Equals } from '../typePredicate'
import { Digit } from './other'
import { DigitToRangeUntil } from './range'

/**
 * Type-level function of N <= M.
 * It's orders of magnitude faster compared to a naive implementation.
 * @param N - A natural number literal type
 * @param M - A natural number literal type
 * @returns true if N <= M, false otherwise
 *
 * @example
 * LteNaturalNumber<3, 4> is equivalent to true
 * LteNaturalNumber<4, 4> is equivalent to true
 * LteNaturalNumber<5, 4> is equivalent to false
 * LteNaturalNumber<9, 123> is equivalent to true
 * @example
 * LteNaturalNumber<1234567, 1234560> is equivalent to false
 */
export type LteNaturalNumber<N extends number, M extends number> = Equals<N, M> extends true
  ? true
  : _LteNaturalNumber<`${N}`, `${M}`>
type _LteNaturalNumber<
  Lhs extends string,
  Rhs extends string,
  LA extends readonly Digit[] = [],
  RA extends readonly Digit[] = []
> = Lhs extends `${infer LH extends Digit}${infer LL}`
  ? Rhs extends `${infer RH extends Digit}${infer RL}`
    ? _LteNaturalNumber<LL, RL, [LH, ...LA], [RH, ...RA]>
    : false
  : Rhs extends `${infer RH extends Digit}${infer RL}`
  ? true
  : _LteNaturalNumberLexicographic<LA, RA>
/**
 * @example
 * _LteNaturalNumberLexicographic<['4'], ['4']> is equivalent to true
 * _LteNaturalNumberLexicographic<['1', '2'], ['4']> is equivalent to true
 * _LteNaturalNumberLexicographic<['1', '2'], ['1']> is equivalent to false
 * _LteNaturalNumberLexicographic<['1', '2'], ['1', '5']> is equivalent to true
 * _LteNaturalNumberLexicographic<['1', '2'], ['0', '5']> is equivalent to false
 * _LteNaturalNumberLexicographic<[], ['0']> is equivalent to true
 */
type _LteNaturalNumberLexicographic<Lhs extends readonly Digit[], Rhs extends readonly Digit[]> = Lhs extends readonly [
  infer LH extends Digit,
  ...infer LL extends readonly Digit[]
]
  ? Rhs extends readonly [infer RH extends Digit, ...infer RL extends readonly Digit[]]
    ? Equals<LH, RH, _LteNaturalNumberLexicographic<LL, RL>, LtDigit<LH, RH>>
    : false
  : true

type LtDigit<Lhs extends Digit, Rhs extends Digit> = Lhs extends DigitToRangeUntil[Rhs] ? true : false

/**
 * @example
 * Min<0, 3> is equivalent to 0
 * Min<2, 2> is equivalent to 2
 * Min<-1, 2> is equivalent to -1
 * Min<-1, -4> is equivalent to -4
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
 * Max<0, 3> is equivalent to 3
 * Max<2, 2> is equivalent to 2
 * Max<-1, 2> is equivalent to 2
 * Max<-1, -4> is equivalent to -1
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
