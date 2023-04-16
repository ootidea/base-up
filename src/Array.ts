import { Digit, IntegerRangeThrough, randomIntegerThrough, ToDigitArray } from './number'
import { Drop } from './transform'

export type Tuple = readonly any[]

export type NonEmptyArray<T> = [T, ...T[]] | [...T[], T]
export type ReadonlyNonEmptyArray<T> = readonly [T, ...T[]] | readonly [...T[], T]

/** Create a tuple by repeating the given tuple 10 times. */
type TenTimes<T extends Tuple> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]
type DigitToFixedSizeArray<N extends Digit, T = unknown> = N extends 0
  ? []
  : N extends 1
  ? [T]
  : N extends 2
  ? [T, T]
  : N extends 3
  ? [T, T, T]
  : N extends 4
  ? [T, T, T, T]
  : N extends 5
  ? [T, T, T, T, T]
  : N extends 6
  ? [T, T, T, T, T, T]
  : N extends 7
  ? [T, T, T, T, T, T, T]
  : N extends 8
  ? [T, T, T, T, T, T, T, T]
  : N extends 9
  ? [T, T, T, T, T, T, T, T, T]
  : never
/**
 * @example
 * DigitArrayToFixedSizeArray<[2]> is equivalent to [unknown, unknown]
 * DigitArrayToFixedSizeArray<[0, 3]> ie equivalent to [unknown, unknown, unknown]
 * DigitArrayToFixedSizeArray<[1, 0]> ie equivalent to [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown
 */
type DigitArrayToFixedSizeArray<DigitArray extends readonly Digit[], T = unknown> = DigitArray extends [
  ...infer R extends readonly Digit[],
  infer Last extends Digit
]
  ? [...DigitToFixedSizeArray<Last, T>, ...TenTimes<DigitArrayToFixedSizeArray<R, T>>]
  : []
/**
 * @example
 * FixedSizeArray<3> is equivalent to [unknown, unknown, unknown]
 * @example
 * FixedSizeArray<3, boolean> is equivalent to [boolean, boolean, boolean]
 * @example
 * FixedSizeArray<0, Set<number>> is equivalent to []
 * @example
 * FixedSizeArray<2 | 3, any> is equivalent to [any, any] | [any, any, any]
 * @example
 * FixedSizeArray<number, bigint> is equivalent to bigint[]
 */
export type FixedSizeArray<N extends number, T = unknown> = DigitArrayToFixedSizeArray<ToDigitArray<N>, T>

/**
 * TODO: OrMoreSizeArray<50> is TS2589 error.
 *
 * @example
 * OrMoreSizeArray<1> is equivalent to [unknown, ...unknown[]] | [...unknown[], unknown]
 * OrMoreSizeArray<2, Date> is equivalent to [Date, Date, ...Date[]] | [Date, ...Date[], Date] | [...Date[], Date, Date]
 * OrMoreSizeArray<0, string> is equivalent to string[]
 * OrMoreSizeArray<number, string> is equivalent to string[]
 */
export type OrMoreSizeArray<N extends number, T = unknown> = _OrMoreSizeArray<N, IntegerRangeThrough<N>, T>
type _OrMoreSizeArray<N extends number, M extends number, T> = M extends M
  ? [...Drop<FixedSizeArray<N, T>, M>, ...T[], ...FixedSizeArray<M, T>]
  : never

export type OrLessSizeArray<N extends number, T = unknown> = FixedSizeArray<IntegerRangeThrough<N>, T>

export function shuffle<const T extends Tuple>(self: T): FixedSizeArray<T['length'], T[number]> {
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
