import { IntegerRangeUpTo, randomIntegerTo } from './number'

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
 * FixedSizeArray<number, bigint> is equivalent to bigint[]
 */
export type FixedSizeArray<N extends number, T = unknown> = number extends N
  ? T[]
  : N extends N
  ? _FixedSizeArray<N, T>
  : never
type _FixedSizeArray<N extends number, T, Result extends readonly T[] = []> = Result['length'] extends N
  ? Result
  : _FixedSizeArray<N, T, [...Result, T]>

/**
 * @example
 * OrMoreSizeArray<1> is equivalent to [unknown, ...unknown[]]
 * OrMoreSizeArray<2, number> is equivalent to [number, number, ...number[]]
 * @example
 * OrMoreSizeArray<0> is equivalent to unknown[]
 * OrMoreSizeArray<1 | 2, any> is equivalent to [any, ...any[]] | [any, any, ...any[]]
 * OrMoreSizeArray<number> is equivalent to unknown[]
 */
export type OrMoreSizeArray<N extends number, T = unknown> = number extends N
  ? T[]
  : N extends N
  ? _OrMoreSizeArray<N, T>
  : never
type _OrMoreSizeArray<N extends number, T, Acc extends readonly T[] = []> = Acc['length'] extends N
  ? [...Acc, ...T[]]
  : _OrMoreSizeArray<N, T, [...Acc, T]>

export type OrLessSizeArray<N extends number, T = unknown> = FixedSizeArray<IntegerRangeUpTo<N>, T>

export function shuffle<const T extends Tuple>(self: T): FixedSizeArray<T['length'], T[number]> {
  const result: T[] = []
  for (let i = 0; i < self.length; ++i) {
    const j = randomIntegerTo(i + 1)
    if (j < i) {
      result.push(result[j])
    }
    result[j] = self[i]
  }
  return result as any
}
