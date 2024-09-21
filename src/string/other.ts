import type { Digit, Infinity, Negate, NegativeInfinity } from '../number/other'
import type { IsUnion, ToBasePrimitiveType } from '../type'
import type { Equals, IsOneOf } from '../typePredicate'

/**
 * @example
 * ToNumber<'00'> equals 0
 * ToNumber<'001'> equals 1
 * ToNumber<'-0'> equals 0
 * ToNumber<'-00'> equals 0
 * ToNumber<'-001'> equals -1
 * ToNumber<'Infinity'> equals Infinity
 * ToNumber<'-Infinity'> equals -Infinity
 * @example
 * ToNumber<'1' | '2'> equals 1 | 2
 * ToNumber<string> equals number
 * ToNumber<any> equals number
 * ToNumber<never> equals never
 * @example NaN is typed as number
 * ToNumber<'0xFF'> equals number
 * ToNumber<'1px'> equals number
 * ToNumber<''> equals number
 * ToNumber<'  12'> equals number
 * ToNumber<'1_234'> equals number
 * ToNumber<'1,234'> equals number
 */
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

export type ToString<T> = T extends Interpolable ? `${T}` : string

export function toString<const T>(value: T): ToString<T> {
  return String(value) as any
}

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
 * IsTemplateLiteral<`Hi, ${string}`> equals true
 * IsTemplateLiteral<`${number}`> equals true
 * IsTemplateLiteral<`${bigint}`> equals true
 * IsTemplateLiteral<`${boolean}`> equals false
 * IsTemplateLiteral<`${null}`> equals false
 * IsTemplateLiteral<`${undefined}`> equals false
 * IsTemplateLiteral<string> equals false
 * IsTemplateLiteral<never> equals false
 * IsTemplateLiteral<any> equals false
 * IsTemplateLiteral<''> equals false
 * IsTemplateLiteral<'a'> equals false
 * IsTemplateLiteral<'a' | 'b'> equals false
 */
export type IsTemplateLiteral<T, Then = true, Else = false> = IsUnion<T> extends true
  ? Else
  : Equals<T, never> extends true
    ? Else
    : T extends `${infer H}${infer L}`
      ? IsOneOf<H, [string, `${number}`, `${bigint}`]> extends true
        ? Then
        : Equals<L, string> extends true
          ? Then
          : IsTemplateLiteral<L, Then, Else>
      : Else

/**
 * @example
 * IsStringLiteral<'a'> equals true
 * IsStringLiteral<''> equals true
 * IsStringLiteral<string> equals false
 * IsStringLiteral<never> equals false
 * IsStringLiteral<any> equals false
 * IsStringLiteral<'a' | 'b'> equals false
 * IsStringLiteral<`${null}`> equals true
 * IsStringLiteral<`${undefined}`> equals true
 * IsStringLiteral<`${boolean}`> equals false
 * IsStringLiteral<`${number}`> equals false
 * IsStringLiteral<`${bigint}`> equals false
 */
export type IsStringLiteral<T extends string> = IsUnion<T> extends true
  ? false
  : IsOneOf<T, [string, never, any]> extends true
    ? false
    : IsTemplateLiteral<T, false, true>

type CharactersSubjectToRemoveByTrim = ' ' | '\t' | '\n' | '\r' | '\f' | '\v' | '\uFEFF' | '\xA0'

/**
 * @example
 * TrimStart<'  abc  '> equals 'abc  '
 * TrimStart<'\n\t\r\uFEFF\xA0'> equals ''
 */
export type TrimStart<T extends string> = Equals<T, any> extends true
  ? string
  : T extends `${CharactersSubjectToRemoveByTrim}${infer L}`
    ? TrimStart<L>
    : T

/**
 * @example
 * trimStart('  abc  ') returns 'abc  '
 * trimStart('\n\t\r\uFEFF\xA0') returns ''
 */
export function trimStart<const T extends string>(self: T): TrimStart<T> {
  return self.trimStart() as any
}

/**
 * @example
 * TrimEnd<'  abc  '> equals '  abc'
 * TrimEnd<'\n\t\r\uFEFF\xA0'> equals ''
 */
export type TrimEnd<T extends string> = Equals<T, any> extends true
  ? string
  : T extends `${infer L}${CharactersSubjectToRemoveByTrim}`
    ? TrimEnd<L>
    : T

/**
 * @example
 * trimEnd('  abc  ') returns '  abc'
 * trimEnd('\n\t\r\uFEFF\xA0') returns ''
 */
export function trimEnd<const T extends string>(self: T): TrimEnd<T> {
  return self.trimEnd() as any
}

/**
 * @example
 * TrimStart<'  abc  '> equals 'abc'
 * TrimStart<'\n\t\r\uFEFF\xA0'> equals ''
 */
export type Trim<T extends string> = TrimStart<TrimEnd<T>>

/**
 * @example
 * trim('  abc  ') returns 'abc'
 * trim('\n\t\r\uFEFF\xA0') returns ''
 */
export function trim<const T extends string>(self: T): Trim<T> {
  return self.trim() as any
}
