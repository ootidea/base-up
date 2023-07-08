import { FixedLengthArray } from '../Array/FixedLengthArray'
import { ReadonlyNonEmptyArray } from '../Array/MinLengthArray'
import { includes } from '../collectionPredicate'
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
 * IsNumberLiteral<0> is equivalent to true
 * IsNumberLiteral<1e100> is equivalent to true
 * IsNumberLiteral<Infinity> is equivalent to true
 * IsNumberLiteral<number> is equivalent to false
 * IsNumberLiteral<1 | 2> is equivalent to false
 * IsNumberLiteral<any> is equivalent to false
 * IsNumberLiteral<never> is equivalent to false
 */
export type IsNumberLiteral<T extends number> = IsUnion<T> extends true
  ? false
  : IsOneOf<T, [number, never, any]> extends true
  ? false
  : true

/**
 * @example
 * IsInteger<12.34> is equivalent to false
 * IsInteger<-12> is equivalent to true
 * IsInteger<1.2e-15> is equivalent to false
 * IsInteger<1.2e+15> is equivalent to true
 * @example
 * IsInteger<1.8e+308> is equivalent to false (Note that 1.8e+308 is Infinity)
 * @example Customizing result values
 * IsInteger<12, []> is equivalent to []
 * IsInteger<0.5, number, never> is equivalent to never
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
 * Abs<-3> is equivalent to 3
 * Abs<0.12> is equivalent to 0.12
 * Abs<-0> is equivalent to 0
 * Abs<-1.2e-45> is equivalent to 1.2e-45
 * Abs<-3 | 5> is equivalent to 3 | 5
 * Abs<number> is equivalent to number
 */
export type Abs<N extends number> = N extends N ? (`${N}` extends `-${infer P extends number}` ? P : N) : never

/**
 * @example
 * Negate<1> is equivalent to -1
 * Negate<-0.5> is equivalent to 0.5
 * Negate<0> is equivalent to 0
 * Negate<-0> is equivalent to 0
 * Negate<1e+100> is equivalent to -1e+100
 * Negate<-1.2e-45> is equivalent to 1.2e-45
 * Negate<2 | -4> is equivalent to -2 | 4
 * Negate<number> is equivalent to number
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
 * Trunc<3.5> is equivalent to 3
 * Trunc<-0.09> is equivalent to 0
 * Trunc<-12> is equivalent to -12
 * Trunc<8.2e-9> is equivalent to 0
 * Trunc<1e+100> is equivalent to 1e+100
 * Trunc<1.1 | 3.3> is equivalent to 1 | 3
 * Trunc<number> is equivalent to number
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
 * ToDigitArray<123> is equivalent to ['1', '2', '3']
 * ToDigitArray<0> is equivalent to ['0']
 */
export type ToDigitArray<N extends number> = _ToDigitArray<`${N}`>
type _ToDigitArray<S extends string> = S extends `${infer H extends Digit}${infer L}` ? [H, ..._ToDigitArray<L>] : []

/**
 * @example
 * Increment<0> is equivalent to 1
 * Increment<-1> is equivalent to 0
 * Increment<-2> is equivalent to -1
 * Increment<1 | 3> is equivalent to 2 | 4
 * Increment<number> is equivalent to number
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

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

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
export function modOf<const N extends number, const M extends number>(a: N, b: M): ModOf<N, M> {
  return (((a % b) + b) % b) as any
}

export type ModOf<N extends number, M extends number> = IsInteger<N> extends false
  ? number
  : IsInteger<M> extends false
  ? number
  : IntegerRangeUntil<M>

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

/**
 * Determines whether a given number is a prime number using the wheel factorization method with the base 2-3-5-7.
 *
 * @example
 * isPrimeNumber(2) returns true
 * isPrimeNumber(3) returns true
 * isPrimeNumber(4) returns false
 * @example
 * isPrimeNumber(-1) returns false
 * isPrimeNumber(0) returns false
 * isPrimeNumber(1) returns false
 * isPrimeNumber(2.5) returns false
 * isPrimeNumber(Infinite) returns false
 */
export function isPrimeNumber(n: number): boolean {
  if (n <= 1 || !Number.isFinite(n) || !Number.isInteger(n)) return false

  const BASE_PRIME_NUMBERS = [2, 3, 5, 7] as const
  const WHEEL = [
    2, 4, 2, 4, 6, 2, 6, 4, 2, 4, 6, 6, 2, 6, 4, 2, 6, 4, 6, 8, 4, 2, 4, 2, 4, 8, 6, 4, 6, 2, 4, 6, 2, 6, 6, 4, 2, 4, 6,
    2, 6, 4, 2, 4, 2, 10, 2, 10,
  ] as const

  if (includes(BASE_PRIME_NUMBERS, n)) return true

  if (BASE_PRIME_NUMBERS.some((p) => n % p === 0)) return false

  let i = 11
  let c = 0
  const upperBound = Math.sqrt(n) + 1
  while (i < upperBound) {
    if (n % i === 0) return false

    i += WHEEL[c % WHEEL.length]!
    c++
  }
  return true
}
