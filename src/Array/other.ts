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
 * IsTuple<[]> is equivalent to true
 * IsTuple<[1, 2, 3]> is equivalent to true
 * IsTuple<[1, ...0[]]> is equivalent to true
 * IsTuple<[1, 2?, 3?]> is equivalent to true
 * IsTuple<number[]> is equivalent to false
 * IsTuple<readonly any[]> is equivalent to false
 */
export type IsTuple<T extends Tuple> = T extends T
  ? IsOneOf<T, [any, T[number][], readonly T[number][]], false, true>
  : never

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
 * UnionToTuple<1 | 2> is equivalent to [1, 2] or [2, 1]
 * UnionToTuple<boolean> is equivalent to [false, true] or [true, false]
 * UnionToTuple<never> is equivalent to []
 * UnionToTuple<any> is equivalent to [any]
 */
export type UnionToTuple<T> = UnionToIntersection<T extends T ? (_: T) => T : never> extends (_: any) => infer U
  ? [...UnionToTuple<Exclude<T, U>>, U]
  : []

/**
 * @example
 * SplitTupleAroundRest<[1, 2, ...3[], 4, 5]> is equivalent to { before: [1, 2], rest: 3[], after: [4, 5] }
 * SplitTupleAroundRest<[1, 2?, ...3[]]> is equivalent to { before: [1, 2?], rest: 3[], after: [] }
 * SplitTupleAroundRest<Date[]> is equivalent to { before: [], rest: Date[], after: [] }
 * SplitTupleAroundRest<[]> is equivalent to { before: [], rest: [], after: [] }
 */
export type SplitTupleAroundRest<
  T extends Tuple,
  Before extends Tuple = [],
  After extends Tuple = []
> = T extends readonly [infer H, ...infer L]
  ? SplitTupleAroundRest<L, [...Before, H], After>
  : T extends readonly [...infer L, infer H]
  ? SplitTupleAroundRest<L, Before, [H, ...After]>
  : IsTuple<T> extends false
  ? { before: Before; rest: T; after: After }
  : T extends readonly []
  ? { before: Before; rest: T; after: After }
  : T extends readonly [(infer H)?, ...infer L]
  ? SplitTupleAroundRest<L, [...Before, H?], After>
  : never
