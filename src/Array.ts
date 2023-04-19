import { Digit, IntegerRangeThrough, randomIntegerThrough, ToDigitArray } from './number'
import { Drop } from './transform'

export type Tuple = readonly any[]

export type NonEmptyArray<T> = [T, ...T[]] | [...T[], T]
export type ReadonlyNonEmptyArray<T> = Readonly<NonEmptyArray<T>>

/**
 * @example
 * FixedLengthArray<3> is equivalent to [unknown, unknown, unknown]
 * @example
 * FixedLengthArray<3, boolean> is equivalent to [boolean, boolean, boolean]
 * @example
 * FixedLengthArray<0, Set<number>> is equivalent to []
 * @example
 * FixedLengthArray<2 | 3, any> is equivalent to [any, any] | [any, any, any]
 * @example
 * FixedLengthArray<number, bigint> is equivalent to bigint[]
 */
export type FixedLengthArray<N extends number, T = unknown> = number extends N
  ? T[]
  : DigitArrayToFixedLengthArray<ToDigitArray<N>, T>

export function isFixedLengthArray<T, N extends number>(
  self: readonly T[],
  length: N
): self is Readonly<FixedLengthArray<N, T>>
export function isFixedLengthArray<N extends number>(self: unknown, length: N): self is Readonly<FixedLengthArray<N>>
export function isFixedLengthArray<N extends number>(self: unknown, length: N) {
  return self instanceof Array && self.length === length
}

/** Create a tuple by repeating the given tuple 10 times. */
type TenTimes<T extends Tuple> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]

type DigitToFixedLengthArray<N extends Digit, T = unknown> = N extends '0'
  ? []
  : N extends '1'
  ? [T]
  : N extends '2'
  ? [T, T]
  : N extends '3'
  ? [T, T, T]
  : N extends '4'
  ? [T, T, T, T]
  : N extends '5'
  ? [T, T, T, T, T]
  : N extends '6'
  ? [T, T, T, T, T, T]
  : N extends '7'
  ? [T, T, T, T, T, T, T]
  : N extends '8'
  ? [T, T, T, T, T, T, T, T]
  : N extends '9'
  ? [T, T, T, T, T, T, T, T, T]
  : never

/**
 * @example
 * DigitArrayToFixedLengthArray<['2']> is equivalent to [unknown, unknown]
 * DigitArrayToFixedLengthArray<['0', '3']> ie equivalent to [unknown, unknown, unknown]
 * DigitArrayToFixedLengthArray<['1', '0']> ie equivalent to [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown
 */
type DigitArrayToFixedLengthArray<DigitArray extends readonly Digit[], T = unknown> = DigitArray extends [
  ...infer R extends readonly Digit[],
  infer Last extends Digit
]
  ? [...DigitToFixedLengthArray<Last, T>, ...TenTimes<DigitArrayToFixedLengthArray<R, T>>]
  : []

/**
 * @example
 * MinLengthArray<1> is equivalent to [unknown, ...unknown[]] | [...unknown[], unknown]
 * MinLengthArray<2, Date> is equivalent to [Date, Date, ...Date[]] | [Date, ...Date[], Date] | [...Date[], Date, Date]
 * MinLengthArray<0, string> is equivalent to string[]
 * MinLengthArray<number, string> is equivalent to string[]
 */
export type MinLengthArray<N extends number, T = unknown> = _MinLengthArray<N, IntegerRangeThrough<N>, T>
type _MinLengthArray<N extends number, M extends number, T> = M extends M
  ? [...Drop<FixedLengthArray<N, T>, M>, ...T[], ...FixedLengthArray<M, T>]
  : never

export type MaxLengthArray<N extends number, T = unknown> = FixedLengthArray<IntegerRangeThrough<N>, T>

export function shuffle<const T extends Tuple>(self: T): FixedLengthArray<T['length'], T[number]> {
  const result: T[] = []
  for (let i = 0; i < self.length; ++i) {
    const j = randomIntegerThrough(i)
    if (j < i) {
      result.push(result[j]!)
    }
    result[j] = self[i]
  }
  return result as any
}
