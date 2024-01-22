import { randomIntegerThrough } from '../number/range'
import { UnionToIntersection } from '../type'
import { Equals, IsOneOf } from '../typePredicate'
import { FixedLengthArray } from './FixedLengthArray'

export type Tuple = readonly unknown[]

export function shuffle<const T extends Tuple>(self: T): FixedLengthArray<T['length'], T[number]> {
  const result: T[number][] = []
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
 * DestructTuple<[1, 2, ...3[], 4, 5]> equals { leading: [1, 2]; rest: 3[]; trailing: [4, 5] }
 * DestructTuple<[1, 2?, ...3[]]> equals { leading: [1]; optional: [2]; rest: 3[]; trailing: [] }
 * DestructTuple<Date[]> equals { leading: []; rest: Date[]; trailing: [] }
 * DestructTuple<[]> equals { leading: []; rest: []; trailing: [] }
 */
export type DestructTuple<
  T extends Tuple,
  Leading extends Tuple = [],
  Optional extends Tuple = [],
  Trailing extends Tuple = [],
> = Equals<T, any> extends true
  ? { leading: []; optional: []; rest: any[]; trailing: [] }
  : T extends readonly [infer H, ...infer L]
  ? DestructTuple<L, [...Leading, H], Optional, Trailing>
  : T extends readonly [...infer L, infer H]
  ? DestructTuple<L, Leading, Optional, [H, ...Trailing]>
  : IsTuple<T> extends false
  ? { leading: Leading; optional: Optional; rest: T; trailing: Trailing }
  : T extends readonly []
  ? { leading: Leading; optional: Optional; rest: T; trailing: Trailing }
  : T extends readonly [(infer H)?, ...infer L]
  ? DestructTuple<L, Leading, [...Optional, H], Trailing>
  : never
