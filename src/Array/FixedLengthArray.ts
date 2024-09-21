import { Digit, ToDigitArray } from '../number/other'

/**
 * @example
 * FixedLengthArray<3> equals [unknown, unknown, unknown]
 * FixedLengthArray<3, boolean> equals [boolean, boolean, boolean]
 * FixedLengthArray<0, Set<number>> equals []
 * @example
 * FixedLengthArray<2 | 3, any> equals [any, any] | [any, any, any]
 * FixedLengthArray<number, bigint> equals bigint[]
 */
export type FixedLengthArray<N extends number, T = unknown> = number extends N
  ? T[]
  : DigitArrayToFixedLengthArray<ToDigitArray<N>, T>
export type ReadonlyFixedLengthArray<N extends number, T = unknown> = Readonly<FixedLengthArray<N, T>>

export function isFixedLengthArray<T, N extends number>(self: T[], length: N): self is FixedLengthArray<N, T>
export function isFixedLengthArray<T, N extends number>(
  self: readonly T[],
  length: N,
): self is ReadonlyFixedLengthArray<N, T>
export function isFixedLengthArray<N extends number>(self: unknown, length: N): self is FixedLengthArray<N>
export function isFixedLengthArray<N extends number>(self: unknown, length: N) {
  return self instanceof Array && self.length === length
}
export function isFixedLengthArrayDefer<N extends number>(
  length: N,
): {
  <T>(self: T[]): self is FixedLengthArray<N, T>
  <T>(self: readonly T[]): self is ReadonlyFixedLengthArray<N, T>
  (self: unknown): self is FixedLengthArray<N>
} {
  return ((self: unknown) => self instanceof Array && self.length === length) as any
}

/** Create a tuple by repeating the given tuple 10 times. */
type TenTimes<T extends readonly unknown[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]
type DigitToFixedLengthArray<N extends Digit, T = unknown> = {
  ['0']: []
  ['1']: [T]
  ['2']: [T, T]
  ['3']: [T, T, T]
  ['4']: [T, T, T, T]
  ['5']: [T, T, T, T, T]
  ['6']: [T, T, T, T, T, T]
  ['7']: [T, T, T, T, T, T, T]
  ['8']: [T, T, T, T, T, T, T, T]
  ['9']: [T, T, T, T, T, T, T, T, T]
}[N]

/**
 * @example
 * DigitArrayToFixedLengthArray<['2']> equals [unknown, unknown]
 * DigitArrayToFixedLengthArray<['0', '3']> ie equivalent to [unknown, unknown, unknown]
 * DigitArrayToFixedLengthArray<['1', '0']> ie equivalent to [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown
 */
type DigitArrayToFixedLengthArray<DigitArray extends readonly Digit[], T = unknown> = DigitArray extends [
  ...infer R extends readonly Digit[],
  infer Last extends Digit,
]
  ? [...DigitToFixedLengthArray<Last, T>, ...TenTimes<DigitArrayToFixedLengthArray<R, T>>]
  : []
