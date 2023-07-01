import { FixedLengthArray } from './Array/FixedLengthArray'
import { IntegerRangeThrough, randomIntegerThrough } from './number'
import { Drop } from './transform'
import { IsEqual, IsOneOf, UnionToIntersection } from './type'

export type Tuple = readonly any[]

export type NonEmptyArray<T = unknown> = [T, ...T[]] | [...T[], T]
export type ReadonlyNonEmptyArray<T> = Readonly<NonEmptyArray<T>>

/**
 * @example
 * MinLengthArray<1> is equivalent to [unknown, ...unknown[]] | [...unknown[], unknown]
 * MinLengthArray<2, Date> is equivalent to [Date, Date, ...Date[]] | [Date, ...Date[], Date] | [...Date[], Date, Date]
 * MinLengthArray<0, string> is equivalent to string[]
 * MinLengthArray<number, string> is equivalent to string[]
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

export function shuffle<const T extends Tuple>(self: T): FixedLengthArray<T['length'], T[number]> {
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

/**
 * @example
 * MinLengthOf<['one', 'two']> is equivalent to 2
 * MinLengthOf<[1, 2, 3]> is equivalent to 3
 * MinLengthOf<[]> is equivalent to 0
 * MinLengthOf<string[]> is equivalent to 0
 * @example
 * MinLengthOf<[1, ...0[]]> is equivalent to 1
 * MinLengthOf<[...0[], 1]> is equivalent to 1
 * MinLengthOf<[1, ...0[], 2]> is equivalent to 2
 * @example
 * MinLengthOf<[1, 2?, 3?]> is equivalent to 1
 * MinLengthOf<[1, 2?, ...3[]]> is equivalent to 1
 * @example
 * MinLengthOf<any> is equivalent to 0
 * MinLengthOf<never> is equivalent to never
 */
export type MinLengthOf<T extends Tuple> = IsOneOf<T, any> extends true
  ? 0
  : IsEqual<T, never> extends true
  ? never
  : _MinLengthOf<T>['length']
type _MinLengthOf<T extends Tuple> = T extends readonly [infer H, ...infer L]
  ? [H, ..._MinLengthOf<L>]
  : T extends readonly [...infer L, infer H]
  ? [..._MinLengthOf<L>, H]
  : []

export type UnionToTuple<T> = UnionToIntersection<T extends T ? (_: T) => T : never> extends (_: any) => infer U
  ? [...UnionToTuple<Exclude<T, U>>, U]
  : []
