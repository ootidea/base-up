import { IsEqual } from './type'

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
