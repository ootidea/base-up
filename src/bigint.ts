import { IsOneOf, IsUnion } from './type'

/**
 * @example
 * IsBigintLiteral<0n> is equivalent to true
 * IsBigintLiteral<5n> is equivalent to true
 * IsBigintLiteral<-10n> is equivalent to true
 * IsBigintLiteral<1n & {}> is equivalent to true
 * @example
 * IsBigintLiteral<1n | 2n> is equivalent to false
 * IsBigintLiteral<bigint> is equivalent to false
 * IsBigintLiteral<any> is equivalent to false
 * IsBigintLiteral<never> is equivalent to false
 */
export type IsBigintLiteral<T extends bigint> = IsUnion<T> extends true
  ? false
  : IsOneOf<T, [bigint, never, any]> extends true
  ? false
  : true
