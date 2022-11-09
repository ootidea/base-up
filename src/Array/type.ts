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

export function assertNonEmpty<T, E>(array: readonly T[], throwee?: E): asserts array is ReadonlyNonEmptyArray<T> {
  if (array.length === 0) {
    throw throwee ?? new TypeError(`${array} is not empty.`)
  }
}
