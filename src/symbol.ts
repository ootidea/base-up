import { IsOneOf, IsUnion } from './type'

/**
 * @example
 * const symbol = Symbol()
 * IsSymbolLiteral<typeof symbol> is equivalent to true
 * @example Union type is not literal type
 * const symbol1 = Symbol()
 * const symbol2 = Symbol()
 * IsSymbolLiteral<typeof symbol1 | typeof symbol2> is equivalent to false
 * @example
 * IsSymbolLiteral<symbol> is equivalent to false
 * IsSymbolLiteral<never> is equivalent to false
 * IsSymbolLiteral<any> is equivalent to false
 */
export type IsSymbolLiteral<T extends symbol> = IsUnion<T> extends true
  ? false
  : IsOneOf<T, [symbol, never, any]> extends true
  ? false
  : true
