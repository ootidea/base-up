import type { Equals, IsOneOf } from './typePredicate'

/**
 * @example
 * Not<true> equals false
 * Not<false> equals true
 * Not<boolean> equals boolean
 * Not<any> equals boolean
 * Not<never> equals never
 */
export type Not<T extends boolean> = Equals<T, never> extends true
  ? never
  : Equals<T, true> extends true
    ? false
    : Equals<T, false> extends true
      ? true
      : boolean

/**
 * @example
 * IsBooleanLiteral<true> equals true
 * IsBooleanLiteral<false> equals true
 * IsBooleanLiteral<true | false> equals false
 * IsBooleanLiteral<boolean> equals false
 * IsBooleanLiteral<any> equals false
 * IsBooleanLiteral<never> equals false
 */
export type IsBooleanLiteral<T extends boolean> = IsOneOf<T, [true, false]>
