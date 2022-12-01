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
 * RangeTo<3> is equivalent to 0 | 1 | 2
 * RangeTo<4, 8> is equivalent to 4 | 5 | 6 | 7
 * RangeTo<5, 3> is equivalent to 5 | 4
 * @example
 * RangeTo<2, -2> is equivalent to 2 | 1 | 0 | -1
 * RangeTo<-2, 2> is equivalent to -2 | -1 | 0 | 1
 * @example
 * RangeTo<1, 1> is equivalent to never
 * RangeTo<0> is equivalent to never
 * @example
 * RangeTo<2 | 4> is equivalent to 0 | 1 | 2 | 3
 * RangeTo<number, 9> is equivalent to number
 * RangeTo<9, number> is equivalent to number
 */
export type RangeTo<N extends number, M extends number | undefined = undefined> = number extends N
  ? number
  : number extends M
  ? number
  : N extends N
  ? M extends M
    ? M extends number
      ? `${N}` extends `-${infer PN extends number}`
        ? `${M}` extends `-${infer PM extends number}`
          ? OrMoreSizeArray<PN> extends OrMoreSizeArray<PM>
            ? Neg<Exclude<_RangeUpTo<PN>, _RangeUpTo<PM>>>
            : Neg<Exclude<_RangeTo<PM>, _RangeTo<PN>>>
          : Neg<_RangeUpTo<PN>> | _RangeTo<M>
        : `${M}` extends `-${infer PM extends number}`
        ? _RangeUpTo<N> | Neg<_RangeTo<PM>>
        : OrMoreSizeArray<N> extends OrMoreSizeArray<M>
        ? Exclude<_RangeUpTo<N>, _RangeUpTo<M>>
        : Exclude<_RangeTo<M>, _RangeTo<N>>
      : RangeTo<0, N>
    : never
  : never
/**
 * @example
 * RangeUpTo<3> is equivalent to 0 | 1 | 2 | 3
 * RangeUpTo<4, 8> is equivalent to 4 | 5 | 6 | 7 | 8
 * RangeUpTo<5, 3> is equivalent to 5 | 4 | 3
 * @example
 * RangeUpTo<2, -2> is equivalent to 2 | 1 | 0 | -1 | -2
 * RangeUpTo<-2, 2> is equivalent to -2 | -1 | 0 | 1 | 2
 * @example
 * RangeUpTo<1, 1> is equivalent to 1
 * RangeUpTo<0> is equivalent to 0
 * @example
 * RangeUpTo<2 | 4> is equivalent to 0 | 1 | 2 | 3 | 4
 * RangeUpTo<number, 9> is equivalent to number
 * RangeUpTo<9, number> is equivalent to number
 */
export type RangeUpTo<N extends number, M extends number | undefined = undefined> = number extends N
  ? number
  : number extends M
  ? number
  : N extends N
  ? M extends M
    ? M extends number
      ? `${N}` extends `-${infer PN extends number}`
        ? `${M}` extends `-${infer PM extends number}`
          ? OrMoreSizeArray<PN> extends OrMoreSizeArray<PM>
            ? Neg<Exclude<_RangeUpTo<PN>, _RangeTo<PM>>>
            : Neg<Exclude<_RangeUpTo<PM>, _RangeTo<PN>>>
          : Neg<_RangeUpTo<PN>> | _RangeUpTo<M>
        : `${M}` extends `-${infer PM extends number}`
        ? _RangeUpTo<N> | Neg<_RangeUpTo<PM>>
        : OrMoreSizeArray<N> extends OrMoreSizeArray<M>
        ? Exclude<_RangeUpTo<N>, _RangeTo<M>>
        : Exclude<_RangeUpTo<M>, _RangeTo<N>>
      : RangeUpTo<0, N>
    : never
  : never
type _RangeTo<N extends number, Result extends Tuple = []> = Result['length'] extends N
  ? never
  : Result['length'] | _RangeTo<N, [...Result, any]>
type _RangeUpTo<N extends number, Result extends Tuple = []> = Result['length'] extends N
  ? N
  : Result['length'] | _RangeUpTo<N, [...Result, any]>

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
export function randomIntegerTo<To extends number>(to: To): RangeTo<To>
export function randomIntegerTo<From extends number, To extends number>(from: From, to: To): RangeTo<From, To>
export function randomIntegerTo<N extends number, M extends number>(first: N, second?: M): number {
  const [from, to] = second === undefined ? [0, first] : [first, second]
  if (from === to) {
    throw RangeError(`The arguments of randomIntegerTo are the same value(${to}).\nMust be different values.`)
  }
  return Math.trunc(Math.random() * (to - from)) + from
}

export function randomIntegerUpTo<N extends number>(upTo: N): RangeUpTo<N>
export function randomIntegerUpTo<N extends number, M extends number>(from: N, upTo: M): RangeUpTo<N, M>
export function randomIntegerUpTo<N extends number, M extends number>(first: N, second?: M): number {
  const from = second === undefined ? 0 : first
  const to = second === undefined ? first : second
  return Math.trunc(Math.random() * (to + 1 - from)) + from
}

/**
 * Function to calculate modulo instead of reminder.
 * @example
 * mod(4, 3) returns 1
 * mod(3, 3) returns 0
 * mod(2, 3) returns 2
 * mod(1, 3) returns 1
 * mod(0, 3) returns 0
 * mod(-1, 3) returns 2
 * mod(-2, 3) returns 1
 * mod(-3, 3) returns 0
 * mod(-4, 3) returns 2
 * @example
 * mod(4, -3) returns -2
 * mod(3, -3) returns -0
 * mod(2, -3) returns -1
 * mod(1, -3) returns -2
 * mod(0, -3) returns -0
 * mod(-1, -3) returns -1
 * mod(-2, -3) returns -2
 * mod(-3, -3) returns -0
 * mod(-4, -3) returns -1
 */
export function mod(a: number, b: number): number {
  return ((a % b) + b) % b
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
