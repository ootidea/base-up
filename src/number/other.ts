import { FixedLengthArray } from '../Array/FixedLengthArray'
import { ReadonlyNonEmptyArray } from '../Array/MinLengthArray'
import { Tuple } from '../Array/other'
import { IsUnion } from '../type'
import { IsOneOf } from '../typePredicate'
import { IntegerRangeUntil } from './range'

export type MaxNumber = 1.7976931348623157e308
export type Infinity = 1e999
export type NegativeInfinity = -1e999
export const Infinity: Infinity = globalThis.Infinity as Infinity
export const NegativeInfinity: NegativeInfinity = -globalThis.Infinity as NegativeInfinity

/**
 * @example
 * IsNumberLiteral<0> equals true
 * IsNumberLiteral<1e100> equals true
 * IsNumberLiteral<Infinity> equals true
 * IsNumberLiteral<number> equals false
 * IsNumberLiteral<1 | 2> equals false
 * IsNumberLiteral<any> equals false
 * IsNumberLiteral<never> equals false
 */
export type IsNumberLiteral<T extends number> = IsUnion<T> extends true
  ? false
  : IsOneOf<T, [number, never, any]> extends true
  ? false
  : true

/**
 * @example
 * IsInteger<12.34> equals false
 * IsInteger<-12> equals true
 * IsInteger<1.2e-15> equals false
 * IsInteger<1.2e+15> equals true
 * @example
 * IsInteger<1.8e+308> equals false (Note that 1.8e+308 is Infinity)
 * @example Customizing result values
 * IsInteger<12, []> equals []
 * IsInteger<0.5, number, never> equals never
 */
export type IsInteger<N extends number, Then = true, Else = false> = N extends N
  ? IsOneOf<N, [number, any]> extends true
    ? boolean
    : `${N}` extends `${string}e+${string}`
    ? Then
    : `${N}` extends `${string}.${string}` | `${string}e-${string}` | 'Infinity' | '-Infinity'
    ? Else
    : Then
  : never

/**
 * @example
 * Abs<-3> equals 3
 * Abs<0.12> equals 0.12
 * Abs<-0> equals 0
 * Abs<-1.2e-45> equals 1.2e-45
 * Abs<-3 | 5> equals 3 | 5
 * Abs<number> equals number
 */
export type Abs<N extends number> = N extends N ? (`${N}` extends `-${infer P extends number}` ? P : N) : never

/**
 * @example
 * Negate<1> equals -1
 * Negate<-0.5> equals 0.5
 * Negate<0> equals 0
 * Negate<-0> equals 0
 * Negate<1e+100> equals -1e+100
 * Negate<-1.2e-45> equals 1.2e-45
 * Negate<2 | -4> equals -2 | 4
 * Negate<number> equals number
 */
export type Negate<N extends number> = N extends 0
  ? 0
  : number extends N
  ? number
  : N extends N
  ? `${N}` extends `-${infer P extends number}`
    ? P
    : `-${N}` extends `${infer M extends number}`
    ? M
    : never
  : never

/**
 * @example
 * Trunc<3.5> equals 3
 * Trunc<-0.09> equals 0
 * Trunc<-12> equals -12
 * Trunc<8.2e-9> equals 0
 * Trunc<1e+100> equals 1e+100
 * Trunc<1.1 | 3.3> equals 1 | 3
 * Trunc<number> equals number
 */
export type Trunc<N extends number> = number extends N
  ? number
  : N extends N
  ? `${N}` extends `${string}e-${string}`
    ? 0
    : `${N}` extends `${string}e+${string}`
    ? N
    : `${N}` extends `-0.${string}`
    ? 0
    : `${N}` extends `${infer I extends number}.${string}`
    ? I
    : N
  : never

/**
 * Convert a natural number type into an array type of its digits.
 * @example
 * ToDigitArray<123> equals ['1', '2', '3']
 * ToDigitArray<0> equals ['0']
 */
export type ToDigitArray<N extends number> = _ToDigitArray<`${N}`>
type _ToDigitArray<S extends string> = S extends `${infer H extends Digit}${infer L}` ? [H, ..._ToDigitArray<L>] : []

/**
 * @example
 * Increment<0> equals 1
 * Increment<-1> equals 0
 * Increment<-2> equals -1
 * Increment<1 | 3> equals 2 | 4
 * Increment<number> equals number
 */
export type Increment<N extends number> = `${N}` extends `-${infer PN extends number}`
  ? FixedLengthArray<PN> extends [any, ...infer L]
    ? Negate<L['length']>
    : never
  : [1, ...FixedLengthArray<N>]['length'] extends infer R extends number
  ? R
  : never

export type Decrement<N extends number> = `${N}` extends `-${infer PN extends number}`
  ? [1, ...FixedLengthArray<PN>]['length'] extends infer R extends number
    ? Negate<R>
    : never
  : FixedLengthArray<N> extends [any, ...infer L]
  ? L['length']
  : -1

export type Subtract<N extends number, M extends number> = _SubtractNaturalNumber<
  FixedLengthArray<N>,
  FixedLengthArray<M>
>
type _SubtractNaturalNumber<N extends Tuple, M extends Tuple> = N extends readonly [any, ...infer NL]
  ? M extends readonly [any, ...infer ML]
    ? _SubtractNaturalNumber<NL, ML>
    : N['length']
  : Negate<M['length']>

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

/**
 * '9': Infinity
 * '8': Positive e+ exponential notation
 * '7': Positive non-exponential notation
 * '6': Positive e- exponential notation
 * '5': 0
 * '4': Negative e- exponential notation
 * '3': Negative non-exponential notation
 * '2': Negative e+ exponential notation
 * '1': -Infinity
 */
export type NumberRankOf<T extends number> = T extends T
  ? IsOneOf<T, [number, any]> extends true
    ? never
    : T extends NegativeInfinity
    ? '1'
    : `${T}` extends `-${string}e+${string}`
    ? '2'
    : `${T}` extends `-${string}e-${string}`
    ? '4'
    : `${T}` extends `-${string}`
    ? '3'
    : T extends 0
    ? '5'
    : T extends Infinity
    ? '9'
    : `${T}` extends `${string}e+${string}`
    ? '8'
    : `${T}` extends `${string}e-${string}`
    ? '6'
    : '7'
  : never

/**
 * Function to calculate modulo instead of reminder.
 * Unlike the % operator, the modOf function handles negative numbers differently, such that the result has the same sign as the divisor.
 *
 * @example
 * modOf(4, 3) returns 1
 * modOf(3, 3) returns 0
 * modOf(2, 3) returns 2
 * modOf(1, 3) returns 1
 * modOf(0, 3) returns 0
 * modOf(-1, 3) returns 2
 * modOf(-2, 3) returns 1
 * modOf(-3, 3) returns 0
 * modOf(-4, 3) returns 2
 * @example
 * modOf(4, -3) returns -2
 * modOf(3, -3) returns -0
 * modOf(2, -3) returns -1
 * modOf(1, -3) returns -2
 * modOf(0, -3) returns -0
 * modOf(-1, -3) returns -1
 * modOf(-2, -3) returns -2
 * modOf(-3, -3) returns -0
 * modOf(-4, -3) returns -1
 * @example
 * modOf(3.5, 2) returns 1.5
 * modOf(0.5, 0.2) returns 0.09999999999999998
 * @example
 * modOf(Infinity, 2) returns NaN
 * modOf(9, Infinity) returns NaN
 */
export function modOf<const N extends number, const M extends number>(
  a: N,
  b: M,
): IsInteger<N> extends false ? number : IsInteger<M> extends false ? number : IntegerRangeUntil<M> {
  return (((a % b) + b) % b) as any
}

/**
 * Round off to the n-th decimal place.
 * @example
 * roundAt(0.123, 2) returns 0.12
 * roundAt(0.123, 1) returns 0.1
 * roundAt(3.14159, 3) returns 3.142
 * roundAt(12345, -1) returns 12350
 * roundAt(12345, -2) returns 12300
 */
export function roundAt(value: number, nthDecimalPlace: number): number {
  const factor = Math.pow(10, nthDecimalPlace)
  return Math.round(value * factor) / factor
}

export function factorialOf(n: number): number {
  if (!Number.isInteger(n)) return NaN
  if (n < 0) return NaN

  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

export function gcdOf(...values: ReadonlyNonEmptyArray<number>): number {
  const [first, ...rest] = values
  let result = first
  for (const value of rest) {
    result = binaryGcdOf(result, value)
  }
  return result
}

function binaryGcdOf(a: number, b: number): number {
  if (b === 0) return a

  return binaryGcdOf(b, a % b)
}
