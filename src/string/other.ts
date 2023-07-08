import { FixedLengthArray } from '../Array/FixedLengthArray'
import { Tuple } from '../Array/other'
import { Digit, Infinity, Negate, NegativeInfinity } from '../number/other'
import { IsEqual, IsOneOf, IsUnion, ToBasePrimitiveType } from '../type'

export type ToNumber<S extends string> = S extends 'Infinity'
  ? Infinity
  : S extends '-Infinity'
  ? NegativeInfinity
  : S extends `-${infer U}`
  ? RemoveLeadingExtraZeros<U> extends `${infer N extends number}`
    ? Negate<N>
    : number
  : RemoveLeadingExtraZeros<S> extends `${infer N extends number}`
  ? N
  : number
type RemoveLeadingExtraZeros<T extends string> = T extends `0${infer U extends Digit}${infer L}`
  ? RemoveLeadingExtraZeros<`${U}${L}`>
  : T

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
export type LiteralAutoComplete<Literals> = Literals | (ToBasePrimitiveType<Literals> & {})

/** The types that can be interpolated within a template literal. */
export type Interpolable = string | number | bigint | boolean | null | undefined

/**
 * @example
 * IsTemplateLiteral<`Hi, ${string}`> is equivalent to true
 * IsTemplateLiteral<`${number}`> is equivalent to true
 * IsTemplateLiteral<`${bigint}`> is equivalent to true
 * IsTemplateLiteral<`${boolean}`> is equivalent to false
 * IsTemplateLiteral<`${null}`> is equivalent to false
 * IsTemplateLiteral<`${undefined}`> is equivalent to false
 * IsTemplateLiteral<string> is equivalent to false
 * IsTemplateLiteral<never> is equivalent to false
 * IsTemplateLiteral<any> is equivalent to false
 * IsTemplateLiteral<''> is equivalent to false
 * IsTemplateLiteral<'a'> is equivalent to false
 * IsTemplateLiteral<'a' | 'b'> is equivalent to false
 */
export type IsTemplateLiteral<T extends string, Then = true, Else = false> = IsUnion<T> extends true
  ? Else
  : IsEqual<T, never> extends true
  ? Else
  : T extends `${infer H}${infer L}`
  ? IsOneOf<H, [string, `${number}`, `${bigint}`]> extends true
    ? Then
    : IsEqual<L, string> extends true
    ? Then
    : IsTemplateLiteral<L, Then, Else>
  : Else

/**
 * @example
 * IsStringLiteral<'a'> is equivalent to true
 * IsStringLiteral<''> is equivalent to true
 * IsStringLiteral<string> is equivalent to false
 * IsStringLiteral<never> is equivalent to false
 * IsStringLiteral<any> is equivalent to false
 * IsStringLiteral<'a' | 'b'> is equivalent to false
 * IsStringLiteral<`${null}`> is equivalent to true
 * IsStringLiteral<`${undefined}`> is equivalent to true
 * IsStringLiteral<`${boolean}`> is equivalent to false
 * IsStringLiteral<`${number}`> is equivalent to false
 * IsStringLiteral<`${bigint}`> is equivalent to false
 */
export type IsStringLiteral<T extends string> = IsUnion<T> extends true
  ? false
  : IsOneOf<T, [string, never, any]> extends true
  ? false
  : IsTemplateLiteral<T, false, true>