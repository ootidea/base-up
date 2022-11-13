import { Until } from './number'
import { PseudoAny } from './type'

export type AccurateTuple = readonly PseudoAny[]
export type Tuple = readonly any[]

export type NonEmptyArray<T> = [T, ...T[]]
export type ReadonlyNonEmptyArray<T> = readonly [T, ...T[]]

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
 * FixedSizeArray<number, bigint> is equivalent to readonly bigint[]
 */
export type FixedSizeArray<N extends number, T = unknown> = number extends N
  ? readonly T[]
  : N extends N
  ? _FixedSizeArray<N, T>
  : never
type _FixedSizeArray<N extends number, T = unknown, Result extends readonly T[] = []> = Result['length'] extends N
  ? Result
  : _FixedSizeArray<N, T, [...Result, T]>

export type LimitedSizeArray<N extends number, T = unknown> = FixedSizeArray<N | Until<N>, T>

export function isEmpty<T>(self: ReadonlyNonEmptyArray<T>): false
export function isEmpty<T>(self: readonly T[]): self is []
export function isEmpty<T>(self: readonly T[]): self is [] {
  return self.length === 0
}

export function isNotEmpty<T>(self: ReadonlyNonEmptyArray<T>): true
export function isNotEmpty<T>(self: readonly T[]): self is ReadonlyNonEmptyArray<T>
export function isNotEmpty<T>(self: readonly T[]): self is ReadonlyNonEmptyArray<T> {
  return self.length > 0
}

export function every<F extends (value: T) => value is U, T, U extends T>(
  array: readonly T[],
  f: F
): array is readonly U[]
export function every<F extends (value: T) => boolean, T>(self: readonly T[], f: F): boolean
export function every<F extends (value: T) => boolean, T>(self: readonly T[], f: F): boolean {
  return self.every(f)
}
