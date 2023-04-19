import { FixedLengthArray, Tuple } from './Array'

type RemoveLeadingExtraZeros<S extends string> = S extends '0'
  ? '0'
  : S extends `0${infer R}`
  ? RemoveLeadingExtraZeros<R>
  : S
export type ToNumber<S extends string> = RemoveLeadingExtraZeros<S> extends `${infer N extends number}` ? N : number

/**
 * @example
 * toNumber('123') returns 123
 * toNumber('123') is typed as 123
 * @example
 * toNumber('-1') returns -1
 * toNumber('-1') is typed as -1
 * @example
 * toNumber('01') returns 1
 * toNumber('01') is typed as 1
 * @example
 * toNumber('1.0') returns 1
 * toNumber('1.0') is typed as number
 * @example
 * toNumber('1.05') returns 1.05
 * toNumber('1.05') is typed as 1.05
 */
export function toNumber<const T extends string>(text: T): ToNumber<T> {
  return Number(text) as any
}

export function toString<T extends string | number | bigint | boolean | null | undefined>(value: T): `${T}`
export function toString(value: any): string
export function toString(value: any): string {
  return String(value)
}

/**
 * @example
 * RepeatString<'Abc', 2> is equivalent to 'AbcAbc'
 * RepeatString<'A', 0> is equivalent to ''
 * @example
 * RepeatString<'A' | 'B', 2> is equivalent to 'AA' | 'AB' | 'BA' | 'BB'
 * RepeatString<'A', 1 | 3> is equivalent to 'A' | 'AAA'
 * @example
 * RepeatString<string, 2> is equivalent to string
 * RepeatString<'A', number> is equivalent to string
 */
export type RepeatString<S extends string, N extends number> = string extends S
  ? string
  : number extends N
  ? string
  : _RepeatString<S, FixedLengthArray<N>>
type _RepeatString<S extends string, Size extends Tuple> = Size extends [any, ...infer L]
  ? `${S}${_RepeatString<S, L>}`
  : ''

/**
 * A type for enabling automatic completion of specific literals in an editor.
 * Unlike a literal union type, it also accepts values other than the specified literals.
 * https://github.com/sindresorhus/type-fest/blob/main/source/literal-union.d.ts
 */
export type LiteralAutoComplete<Literals extends Base, Base = string> = Literals | (Base & Record<never, never>)
