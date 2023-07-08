import { IntegerRangeThrough } from '../number/range'
import { FixedLengthArray } from './FixedLengthArray'

/**
 * @example
 * MaxLengthArray<2> is equivalent to [] | [unknown] | [unknown, unknown]
 * MaxLengthArray<3, Date> is equivalent to [] | [Date] | [Date, Date] | [Date, Date, Date]
 * MaxLengthArray<0, string> is equivalent to []
 * @example
 * MaxLengthArray<number, string> is equivalent to string[]
 */
export type MaxLengthArray<N extends number, T = unknown> = FixedLengthArray<IntegerRangeThrough<N>, T>

export type ReadonlyMaxLengthArray<N extends number, T = unknown> = Readonly<MaxLengthArray<N, T>>

export function isMaxLengthArray<T, N extends number>(
  self: readonly T[],
  length: N
): self is ReadonlyMaxLengthArray<N, T>
export function isMaxLengthArray<N extends number>(self: unknown, length: N): self is MaxLengthArray<N>
export function isMaxLengthArray<N extends number>(self: unknown, length: N) {
  return self instanceof Array && self.length <= length
}
