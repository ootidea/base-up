import { FixedLengthArray } from './Array/FixedLengthArray'
import { Tuple } from './Array/other'
import { Digit, Infinity, Negate, NegativeInfinity } from './number/other'
import { Join } from './transform'
import { IsEqual, IsOneOf, IsUnion, ToBasePrimitiveType } from './type'

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

export type UppercaseLetter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
export type LowercaseLetter =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

/**
 * Splits a string in formats like snake_case or PascalCase into words.
 * Words such as 'iPhone' are not correctly recognized.
 * @example
 * SplitToWords<''> is equivalent to []
 * SplitToWords<'kebab-case'> is equivalent to ['kebab', 'case']
 * SplitToWords<'snake_case'> is equivalent to ['snake', 'case']
 * SplitToWords<'PascalCase'> is equivalent to ['Pascal', 'Case']
 * SplitToWords<'camelCase'> is equivalent to ['camel', 'Case']
 * SplitToWords<'SCREAMING_SNAKE_CASE'> is equivalent to ['SCREAMING', 'SNAKE', 'CASE']
 * SplitToWords<'Title Case'> is equivalent to ['Title', 'Case']
 * @example
 * SplitToWords<'block__element--modifier'> is equivalent to ['block', 'element', 'modifier']
 * SplitToWords<`abc_${string}_xyz`> is equivalent to ['abc', string, 'xyz']
 * @example
 * SplitToWords<'iPhone'> is equivalent to ['i', 'Phone']
 */
export type SplitToWords<T extends string, D extends string = '-' | '_' | ' '> = IsOneOf<T, [string, any]> extends true
  ? string[]
  : _SplitToWords<T, D>
type _SplitToWords<
  T extends string,
  D extends string,
  Acc extends string = '',
  Result extends string[] = []
> = T extends `${infer H1 extends LowercaseLetter}${infer H2 extends UppercaseLetter}${infer L}`
  ? _SplitToWords<`${H2}${L}`, D, '', [...Result, `${Acc}${H1}`]>
  : T extends `${D}${infer L}`
  ? _SplitToWords<L, D, '', Acc extends '' ? Result : [...Result, Acc]>
  : T extends `${infer H1}${infer L}`
  ? _SplitToWords<L, D, `${Acc}${H1}`, Result>
  : Acc extends ''
  ? Result
  : [...Result, Acc]

/**
 * @example
 * ToKebabCase<'camelCase'> is equivalent to 'camel-case'
 * ToKebabCase<'PascalCase'> is equivalent to 'pascal-case'
 * ToKebabCase<'snake_case'> is equivalent to 'snake-case'
 * ToKebabCase<'SCREAMING_SNAKE_CASE'> is equivalent to 'screaming-snake-case'
 * ToKebabCase<'Title Case'> is equivalent to 'title-case'
 * ToKebabCase<'block__element--modifier'> is equivalent to 'block-element-modifier'
 * @example
 * ToKebabCase<'camelCase' | 'PascalCase'> is equivalent to 'camel-case' | 'pascal-case'
 */
export type ToKebabCase<T extends string> = IsOneOf<T, [string, any]> extends true
  ? string
  : Lowercase<Join<SplitToWords<T>, '-'>>
