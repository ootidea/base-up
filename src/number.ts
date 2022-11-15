import { AccurateTuple, FixedSizeArray, OrMoreSizeArray, ReadonlyNonEmptyArray, Tuple } from './Array'

/**
 * @example
 * Until<3> is equivalent to 0 | 1 | 2
 * Until<0> is equivalent to never
 * @example
 * Until<2 | 4> is equivalent to 0 | 1 | 2 | 3
 * Until<number> is equivalent to number
 */
export type Until<N extends number> = number extends N ? number : N extends N ? _Until<N> : never
type _Until<N extends number, Result extends AccurateTuple = []> = Result['length'] extends N
  ? never
  : Result['length'] | _Until<N, [...Result, any]>

/**
 * @example
 * Abs<-3> is equivalent to 3
 * Abs<0.12> is equivalent to 0.12
 * Abs<-0> is equivalent to 0
 */
export type Abs<N extends number> = `${N}` extends `-${infer P extends number}` ? P : N
/**
 * @example
 * Neg<1> is equivalent to -1
 * Neg<-0.5> is equivalent to 0.5
 */
export type Neg<N extends number> = `${N}` extends `-${infer P extends number}`
  ? P
  : `-${N}` extends `${infer M extends number}`
  ? M
  : never

/**
 * @example
 * Min<0, 3> is equivalent to 0
 * Min<2, 2> is equivalent to 2
 */
export type Min<N extends number, M extends number> = OrMoreSizeArray<N> extends OrMoreSizeArray<M> ? M : N
/**
 * @example
 * Max<0, 3> is equivalent to 3
 * Max<2, 2> is equivalent to 2
 */
export type Max<N extends number, M extends number> = OrMoreSizeArray<N> extends OrMoreSizeArray<M> ? N : M

/**
 * @example
 * RangeTo<3> is equivalent to 0 | 1 | 2
 * RangeTo<4, 8> is equivalent to 4 | 5 | 6 | 7
 * RangeTo<5, 3> is equivalent to 5 | 4
 * RangeTo<1, 2> is equivalent to 1
 * RangeTo<1, 1> is equivalent to never
 * RangeTo<0> is equivalent to never
 * RangeTo<2 | 4> is equivalent to 0 | 1 | 2 | 3
 * RangeTo<number, 9> is equivalent to number
 * RangeTo<9, number> is equivalent to number
 */
export type RangeTo<N extends number, M extends number = 0> = PositiveRangeTo<N, M>
type PositiveRangeTo<N extends number, M extends number = 0> = number extends N
  ? number
  : number extends M
  ? number
  : N extends N
  ? M extends M
    ? _PositiveRangeTo<Min<N, M>, Max<N, M>>
    : never
  : never
type _PositiveRangeTo<
  Min extends number,
  Max extends number,
  Result extends Tuple = FixedSizeArray<Min>
> = Result['length'] extends Max ? never : Result['length'] | _PositiveRangeTo<Min, Max, [...Result, any]>

/**
 * @example
 * randomIntegerUntil(3) results 0 or 1 or 2
 * randomIntegerUntil(1) results 0
 * randomIntegerUntil(0) results 0
 */
export function randomIntegerUntil<N extends number>(value: N): Until<N> {
  return Math.floor(Math.random() * value) as any
}

export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

/**
 * Function to calculate modulo instead of reminder.
 * @example
 * mod(4, 3) results 1
 * mod(3, 3) results 0
 * mod(2, 3) results 2
 * mod(1, 3) results 1
 * mod(0, 3) results 0
 * mod(-1, 3) results 2
 * mod(-2, 3) results 1
 * mod(-3, 3) results 0
 * mod(-4, 3) results 2
 * @example
 * mod(4, -3) results -2
 * mod(3, -3) results -0
 * mod(2, -3) results -1
 * mod(1, -3) results -2
 * mod(0, -3) results -0
 * mod(-1, -3) results -1
 * mod(-2, -3) results -2
 * mod(-3, -3) results -0
 * mod(-4, -3) results -1
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
