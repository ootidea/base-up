import { IntegerRangeThrough } from '../number/range'
import { Drop } from '../transform'
import { FixedLengthArray } from './FixedLengthArray'

export type NonEmptyArray<T = unknown> = [T, ...T[]] | [...T[], T]

export type ReadonlyNonEmptyArray<T> = Readonly<NonEmptyArray<T>>

/**
 * @example
 * MinLengthArray<1> equals [unknown, ...unknown[]] | [...unknown[], unknown]
 * MinLengthArray<2, Date> equals [Date, Date, ...Date[]] | [Date, ...Date[], Date] | [...Date[], Date, Date]
 * MinLengthArray<0, string> equals string[]
 * MinLengthArray<number, string> equals string[]
 */
export type MinLengthArray<N extends number, T = unknown> = _MinLengthArray<N, IntegerRangeThrough<N>, T>
type _MinLengthArray<N extends number, M extends number, T> = M extends M
  ? [...Drop<FixedLengthArray<N, T>, M>, ...T[], ...FixedLengthArray<M, T>]
  : never

export type ReadonlyMinLengthArray<N extends number, T = unknown> =
  // For some reason, defining it as Readonly<MinLengthArray<N, T>> caused a type error, so I defined it using a different way.
  _ReadonlyMinLengthArray<N, IntegerRangeThrough<N>, T>
type _ReadonlyMinLengthArray<N extends number, M extends number, T> = M extends M
  ? readonly [...Drop<FixedLengthArray<N, T>, M>, ...T[], ...FixedLengthArray<M, T>]
  : never

export function isMinLengthArray<T, N extends number>(
  self: readonly T[],
  length: N
): self is ReadonlyMinLengthArray<N, T>
export function isMinLengthArray<N extends number>(self: unknown, length: N): self is MinLengthArray<N>
export function isMinLengthArray<N extends number>(self: unknown, length: N) {
  return self instanceof Array && self.length >= length
}
