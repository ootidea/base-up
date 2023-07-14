import { IsUnion } from './type'
import { IsOneOf } from './typePredicate'

/**
 * @example
 * const symbol = Symbol()
 * IsSymbolLiteral<typeof symbol> equals true
 * @example Union type is not literal type
 * const symbol1 = Symbol()
 * const symbol2 = Symbol()
 * IsSymbolLiteral<typeof symbol1 | typeof symbol2> equals false
 * @example
 * IsSymbolLiteral<symbol> equals false
 * IsSymbolLiteral<never> equals false
 * IsSymbolLiteral<any> equals false
 */
export type IsSymbolLiteral<T extends symbol> = IsUnion<T> extends true
  ? false
  : IsOneOf<T, [symbol, never, any]> extends true
  ? false
  : true
