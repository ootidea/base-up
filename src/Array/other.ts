import { randomIntegerThrough } from '../number/range'
import { UnionToIntersection } from '../type'
import { Equals, IsOneOf } from '../typePredicate'
import { FixedLengthArray } from './FixedLengthArray'

export type Tuple = readonly any[]

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
 * IsTuple<[]> equals true
 * IsTuple<[1, 2, 3]> equals true
 * IsTuple<[1, ...0[]]> equals true
 * IsTuple<[1, 2?, 3?]> equals true
 * IsTuple<number[]> equals false
 * IsTuple<readonly any[]> equals false
 */
export type IsTuple<T extends Tuple> = T extends T
  ? IsOneOf<T, [any, T[number][], readonly T[number][]], false, true>
  : never

/**
 * @example
 * MinLengthOf<['one', 'two']> equals 2
 * MinLengthOf<[1, 2, 3]> equals 3
 * MinLengthOf<[]> equals 0
 * MinLengthOf<string[]> equals 0
 * @example
 * MinLengthOf<[1, ...0[]]> equals 1
 * MinLengthOf<[...0[], 1]> equals 1
 * MinLengthOf<[1, ...0[], 2]> equals 2
 * @example
 * MinLengthOf<[1, 2?, 3?]> equals 1
 * MinLengthOf<[1, 2?, ...3[]]> equals 1
 * @example
 * MinLengthOf<any> equals 0
 * MinLengthOf<never> equals never
 */
export type MinLengthOf<T extends Tuple> = Equals<T, any> extends true
  ? 0
  : Equals<T, never> extends true
  ? never
  : RemoveElementsThatMightNotExist<T>['length']
type RemoveElementsThatMightNotExist<T extends Tuple> = T extends readonly [infer H, ...infer L]
  ? [H, ...RemoveElementsThatMightNotExist<L>]
  : T extends readonly [...infer L, infer H]
  ? [...RemoveElementsThatMightNotExist<L>, H]
  : []

/**
 * @example
 * UnionToTuple<1 | 2> equals [1, 2] or [2, 1]
 * UnionToTuple<boolean> equals [false, true] or [true, false]
 * UnionToTuple<never> equals []
 * UnionToTuple<any> equals [any]
 */
export type UnionToTuple<T> = UnionToIntersection<T extends T ? (_: T) => T : never> extends (_: any) => infer U
  ? [...UnionToTuple<Exclude<T, U>>, U]
  : []

/**
 * @example
 * SplitTupleAroundRest<[1, 2, ...3[], 4, 5]> equals { before: [1, 2], rest: 3[], after: [4, 5] }
 * SplitTupleAroundRest<[1, 2?, ...3[]]> equals { before: [1, 2?], rest: 3[], after: [] }
 * SplitTupleAroundRest<Date[]> equals { before: [], rest: Date[], after: [] }
 * SplitTupleAroundRest<[]> equals { before: [], rest: [], after: [] }
 */
export type SplitTupleAroundRest<T extends Tuple> = Equals<T, any> extends true
  ? { before: []; rest: any[]; after: [] }
  : _SplitTupleAroundRest<T>
export type _SplitTupleAroundRest<
  T extends Tuple,
  Before extends Tuple = [],
  After extends Tuple = []
> = T extends readonly [infer H, ...infer L]
  ? _SplitTupleAroundRest<L, [...Before, H], After>
  : T extends readonly [...infer L, infer H]
  ? _SplitTupleAroundRest<L, Before, [H, ...After]>
  : IsTuple<T> extends false
  ? { before: Before; rest: T; after: After }
  : T extends readonly []
  ? { before: Before; rest: T; after: After }
  : T extends readonly [(infer H)?, ...infer L]
  ? _SplitTupleAroundRest<L, [...Before, H?], After>
  : never
