import { Join } from '../transform'
import { IsOneOf } from '../type'

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
