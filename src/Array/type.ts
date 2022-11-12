import { Until } from '../number/other'
import { PseudoAny } from '../other'

export type AccurateTuple = readonly PseudoAny[]

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

export function isEmpty<T>(array: ReadonlyNonEmptyArray<T>): false
export function isEmpty<T>(array: readonly T[]): array is []
export function isEmpty<T>(array: readonly T[]): array is [] {
  return array.length === 0
}

export function isNotEmpty<T>(array: ReadonlyNonEmptyArray<T>): true
export function isNotEmpty<T>(array: readonly T[]): array is ReadonlyNonEmptyArray<T>
export function isNotEmpty<T>(array: readonly T[]): array is ReadonlyNonEmptyArray<T> {
  return array.length > 0
}

export function every<F extends (value: T) => value is U, T, U extends T>(
  array: readonly T[],
  f: F
): array is readonly U[]
export function every<F extends (value: T) => boolean, T>(array: readonly T[], f: F): boolean
export function every<F extends (value: T) => boolean, T>(array: readonly T[], f: F): boolean {
  return array.every(f)
}
