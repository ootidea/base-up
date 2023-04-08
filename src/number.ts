import { FixedSizeArray, OrMoreSizeArray, ReadonlyNonEmptyArray, Tuple } from './Array'

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
 * Neg<1> is equivalent to -1
 * Neg<-0.5> is equivalent to 0.5
 * Neg<0> is equivalent to 0
 * Neg<-0> is equivalent to 0
 * Neg<1e+100> is equivalent to -1e+100
 * Neg<-1.2e-45> is equivalent to 1.2e-45
 * Neg<2 | -4> is equivalent to -2 | 4
 * Neg<number> is equivalent to number
 */
export type Neg<N extends number> = N extends 0
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
 * Trunc<-3.5> is equivalent to -3
 * Trunc<0.99> is equivalent to 0
 * Trunc<12> is equivalent to 12
 * Trunc<8.2e-9> is equivalent to 0
 * Trunc<1e+100> is equivalent to 1e+100
 * Trunc<1.1 | 3.3> is equivalent to 1 | 3
 * Trunc<number> is equivalent to number
 */
export type Trunc<N extends number> = number extends N
  ? number
  : N extends N
  ? `${N}` extends `${number}e-${number}`
    ? 0
    : `${N}` extends `${number}e+${number}`
    ? N
    : `${N}` extends `-0.${number}`
    ? 0
    : `${N}` extends `${infer I extends number}.${number}`
    ? I
    : N
  : never

/**
 * @example
 * Min<0, 3> is equivalent to 0
 * Min<2, 2> is equivalent to 2
 * Min<-1, 2> is equivalent to -1
 * Min<-1, -4> is equivalent to -4
 */
export type Min<N extends number, M extends number> = `${N}` extends `-${infer PN extends number}`
  ? `${M}` extends `-${infer PM extends number}`
    ? OrMoreSizeArray<PN> extends OrMoreSizeArray<PM>
      ? N
      : M
    : N
  : `${M}` extends `-${infer PM extends number}`
  ? M
  : OrMoreSizeArray<N> extends OrMoreSizeArray<M>
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
    ? OrMoreSizeArray<PN> extends OrMoreSizeArray<PM>
      ? M
      : N
    : M
  : `${M}` extends `-${infer PM extends number}`
  ? N
  : OrMoreSizeArray<N> extends OrMoreSizeArray<M>
  ? N
  : M

/**
 * @example
 * Increment<0> is equivalent to 1
 * Increment<-1> is equivalent to 0
 * Increment<-2> is equivalent to -1
 * Increment<1 | 3> is equivalent to 2 | 4
 * Increment<number> is equivalent to number
 */
export type Increment<N extends number> = `${N}` extends `-${infer PN extends number}`
  ? FixedSizeArray<PN> extends [any, ...infer L]
    ? Neg<L['length']>
    : never
  : [any, ...FixedSizeArray<N>]['length'] extends infer R extends number
  ? R
  : never

export type Decrement<N extends number> = `${N}` extends `-${infer PN extends number}`
  ? [any, ...FixedSizeArray<PN>]['length'] extends infer R extends number
    ? Neg<R>
    : never
  : FixedSizeArray<N> extends [any, ...infer L]
  ? L['length']
  : -1

/**
 * @example
 * IntegerRangeTo<3> is equivalent to 0 | 1 | 2
 * IntegerRangeTo<4, 8> is equivalent to 4 | 5 | 6 | 7
 * IntegerRangeTo<5, 3> is equivalent to 5 | 4
 * @example
 * IntegerRangeTo<2, -2> is equivalent to 2 | 1 | 0 | -1
 * IntegerRangeTo<-2, 2> is equivalent to -2 | -1 | 0 | 1
 * @example
 * IntegerRangeTo<1, 1> is equivalent to never
 * IntegerRangeTo<0> is equivalent to never
 * @example
 * IntegerRangeTo<2 | 4> is equivalent to 0 | 1 | 2 | 3
 * IntegerRangeTo<number, 9> is equivalent to number
 * IntegerRangeTo<9, number> is equivalent to number
 */
export type IntegerRangeTo<N extends number, M extends number | undefined = undefined> = number extends N
  ? number
  : number extends M
  ? number
  : N extends N
  ? M extends M
    ? M extends number
      ? `${N}` extends `-${infer PN extends number}`
        ? `${M}` extends `-${infer PM extends number}`
          ? OrMoreSizeArray<PN> extends OrMoreSizeArray<PM>
            ? Neg<Exclude<_IntegerRangeUpTo<PN>, _IntegerRangeUpTo<PM>>>
            : Neg<Exclude<_IntegerRangeTo<PM>, _IntegerRangeTo<PN>>>
          : Neg<_IntegerRangeUpTo<PN>> | _IntegerRangeTo<M>
        : `${M}` extends `-${infer PM extends number}`
        ? _IntegerRangeUpTo<N> | Neg<_IntegerRangeTo<PM>>
        : OrMoreSizeArray<N> extends OrMoreSizeArray<M>
        ? Exclude<_IntegerRangeUpTo<N>, _IntegerRangeUpTo<M>>
        : Exclude<_IntegerRangeTo<M>, _IntegerRangeTo<N>>
      : IntegerRangeTo<0, N>
    : never
  : never
/**
 * @example
 * IntegerRangeUpTo<3> is equivalent to 0 | 1 | 2 | 3
 * IntegerRangeUpTo<4, 8> is equivalent to 4 | 5 | 6 | 7 | 8
 * IntegerRangeUpTo<5, 3> is equivalent to 5 | 4 | 3
 * @example
 * IntegerRangeUpTo<2, -2> is equivalent to 2 | 1 | 0 | -1 | -2
 * IntegerRangeUpTo<-2, 2> is equivalent to -2 | -1 | 0 | 1 | 2
 * @example
 * IntegerRangeUpTo<1, 1> is equivalent to 1
 * IntegerRangeUpTo<0> is equivalent to 0
 * @example
 * IntegerRangeUpTo<2 | 4> is equivalent to 0 | 1 | 2 | 3 | 4
 * IntegerRangeUpTo<number, 9> is equivalent to number
 * IntegerRangeUpTo<9, number> is equivalent to number
 */
export type IntegerRangeUpTo<N extends number, M extends number | undefined = undefined> = number extends N
  ? number
  : number extends M
  ? number
  : N extends N
  ? M extends M
    ? M extends number
      ? `${N}` extends `-${infer PN extends number}`
        ? `${M}` extends `-${infer PM extends number}`
          ? OrMoreSizeArray<PN> extends OrMoreSizeArray<PM>
            ? Neg<Exclude<_IntegerRangeUpTo<PN>, _IntegerRangeTo<PM>>>
            : Neg<Exclude<_IntegerRangeUpTo<PM>, _IntegerRangeTo<PN>>>
          : Neg<_IntegerRangeUpTo<PN>> | _IntegerRangeUpTo<M>
        : `${M}` extends `-${infer PM extends number}`
        ? _IntegerRangeUpTo<N> | Neg<_IntegerRangeUpTo<PM>>
        : OrMoreSizeArray<N> extends OrMoreSizeArray<M>
        ? Exclude<_IntegerRangeUpTo<N>, _IntegerRangeTo<M>>
        : Exclude<_IntegerRangeUpTo<M>, _IntegerRangeTo<N>>
      : IntegerRangeUpTo<0, N>
    : never
  : never
type _IntegerRangeTo<N extends number, Result extends Tuple = []> = Result['length'] extends N
  ? never
  : Result['length'] | _IntegerRangeTo<N, [...Result, any]>
type _IntegerRangeUpTo<N extends number, Result extends Tuple = []> = Result['length'] extends N
  ? N
  : Result['length'] | _IntegerRangeUpTo<N, [...Result, any]>

/**
 * @example
 * randomIntegerTo(3) returns 0, 1 or 2
 * randomIntegerTo(3) is typed as 0 | 1 | 2
 * randomIntegerTo(1, 4) returns 1, 2 or 3
 * randomIntegerTo(1, 4) is typed as 1 | 2 | 3
 * @example
 * randomIntegerTo(-2) returns 0 or -1
 * randomIntegerTo(-2) is typed as 0 | -1
 * @example
 * randomIntegerTo(0) throws RangeError
 * randomIntegerTo(0) is typed as never
 * randomIntegerTo(5, 5) throws RangeError
 * randomIntegerTo(5, 5) is typed as never
 */
export function randomIntegerTo<To extends number>(to: To): IntegerRangeTo<To>
export function randomIntegerTo<From extends number, To extends number>(from: From, to: To): IntegerRangeTo<From, To>
export function randomIntegerTo<N extends number, M extends number>(first: N, second?: M): number {
  const [from, to] = second === undefined ? [0, first] : [first, second]
  if (from === to) {
    throw RangeError(`The arguments of randomIntegerTo are the same value(${to}).\nMust be different values.`)
  }
  return Math.trunc(Math.random() * (to - from)) + from
}

export function randomIntegerUpTo<N extends number>(upTo: N): IntegerRangeUpTo<N>
export function randomIntegerUpTo<N extends number, M extends number>(from: N, upTo: M): IntegerRangeUpTo<N, M>
export function randomIntegerUpTo<N extends number, M extends number>(first: N, second?: M): number {
  const from = second === undefined ? 0 : first
  const to = second === undefined ? first : second
  return Math.trunc(Math.random() * (to + 1 - from)) + from
}

export function clamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(value, max))
}

/**
 * Function to calculate modulo instead of reminder.
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
 */
export function modOf(a: number, b: number): number {
  return ((a % b) + b) % b
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
  if (n === 0) return 1
  if (n < 0) return NaN

  let result = n
  for (let i = n - 1; i > 1; i--) {
    result *= i
  }
  return result
}

export function gcdOf(...values: ReadonlyNonEmptyArray<number>): number {
  let result = values[0]
  for (let i = 1; i < values.length; i++) {
    result = binaryGcdOf(result, values[i])
  }
  return result
}
function binaryGcdOf(a: number, b: number): number {
  if (b === 0) return a

  return binaryGcdOf(b, a % b)
}
