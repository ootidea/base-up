import { IntegerRangeThrough } from '../number/range'
import { FixedLengthArray } from './FixedLengthArray'

/**
 * @example
 * MaxLengthArray<2> equals [] | [unknown] | [unknown, unknown]
 * MaxLengthArray<3, Date> equals [] | [Date] | [Date, Date] | [Date, Date, Date]
 * MaxLengthArray<0, string> equals []
 * @example
 * MaxLengthArray<number, string> equals string[]
 */
export type MaxLengthArray<N extends number, T = unknown> = FixedLengthArray<IntegerRangeThrough<N>, T>

export type ReadonlyMaxLengthArray<N extends number, T = unknown> = Readonly<MaxLengthArray<N, T>>

export function isMaxLengthArray<T, N extends number>(self: T[], length: N): self is MaxLengthArray<N, T>
export function isMaxLengthArray<T, N extends number>(
  self: readonly T[],
  length: N,
): self is ReadonlyMaxLengthArray<N, T>
export function isMaxLengthArray<N extends number>(self: unknown, length: N): self is MaxLengthArray<N>
export function isMaxLengthArray<N extends number>(self: unknown, length: N) {
  return self instanceof Array && self.length <= length
}
export function isMaxLengthArrayDefer<N extends number>(
  length: N,
): {
  <T>(self: T[]): self is MaxLengthArray<N, T>
  <T>(self: readonly T[]): self is ReadonlyMaxLengthArray<N, T>
  (self: unknown): self is MaxLengthArray<N>
} {
  return ((self: unknown) => self instanceof Array && self.length === length) as any
}
