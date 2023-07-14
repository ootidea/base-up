import { IsUnion } from './type'
import { IsOneOf } from './typePredicate'

/**
 * @example
 * IsBigintLiteral<0n> equals true
 * IsBigintLiteral<5n> equals true
 * IsBigintLiteral<-10n> equals true
 * IsBigintLiteral<1n & {}> equals true
 * @example
 * IsBigintLiteral<1n | 2n> equals false
 * IsBigintLiteral<bigint> equals false
 * IsBigintLiteral<any> equals false
 * IsBigintLiteral<never> equals false
 */
export type IsBigintLiteral<T extends bigint> = IsUnion<T> extends true
  ? false
  : IsOneOf<T, [bigint, never, any]> extends true
  ? false
  : true
