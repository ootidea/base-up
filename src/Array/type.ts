export type NonEmptyArray<T> = [T, ...T[]]

export type ReadonlyNonEmptyArray<T> = readonly [T, ...T[]]

/**
 * @example
 * FixedLengthArray<3> is equivalent to [undefined, undefined, undefined]
 * @example
 * FixedLengthArray<3, boolean> is equivalent to [boolean, boolean, boolean]
 * @example
 * FixedLengthArray<0, Set<number>> is equivalent to []
 * @example
 * FixedLengthArray<2 | 4> is equivalent to [undefined, undefined]
 * @example
 * FixedLengthArray<number> is equivalent to []
 */
export type FixedLengthArray<
  N extends number,
  T = undefined,
  Result extends readonly any[] = []
> = Result['length'] extends N ? Result : FixedLengthArray<N, T, [...Result, T]>

export type Tail<T> = T extends [any, ...infer A] ? A : []

export function isEmpty<T>(array: readonly T[]): array is [] {
  return array.length === 0
}

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
