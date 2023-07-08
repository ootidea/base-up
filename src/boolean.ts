import { IsEqual, IsOneOf } from './typePredicate'

/**
 * @example
 * Not<true> is equivalent to false
 * Not<false> is equivalent to true
 * Not<boolean> is equivalent to boolean
 * Not<any> is equivalent to boolean
 * Not<never> is equivalent to never
 */
export type Not<T extends boolean> = IsEqual<T, never> extends true
  ? never
  : IsEqual<T, true> extends true
  ? false
  : IsEqual<T, false> extends true
  ? true
  : boolean

/**
 * @example
 * IsBooleanLiteral<true> is equivalent to true
 * IsBooleanLiteral<false> is equivalent to true
 * IsBooleanLiteral<true | false> is equivalent to false
 * IsBooleanLiteral<boolean> is equivalent to false
 * IsBooleanLiteral<any> is equivalent to false
 * IsBooleanLiteral<never> is equivalent to false
 */
export type IsBooleanLiteral<T extends boolean> = IsOneOf<T, [true, false]>
