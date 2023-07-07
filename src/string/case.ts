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

export function isUppercaseLetter(self: string): self is UppercaseLetter {
  return self.length === 1 && 'A' <= self && self <= 'Z'
}

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

export function isLowercaseLetter(self: string): self is LowercaseLetter {
  return self.length === 1 && 'a' <= self && self <= 'z'
}

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
  : T extends `${infer H1 extends UppercaseLetter}${infer H2 extends LowercaseLetter}${infer L}`
  ? _SplitToWords<`${H2}${L}`, D, H1, Acc extends '' ? Result : [...Result, Acc]>
  : T extends `${D}${infer L}`
  ? _SplitToWords<L, D, '', Acc extends '' ? Result : [...Result, Acc]>
  : T extends `${infer H1}${infer L}`
  ? _SplitToWords<L, D, `${Acc}${H1}`, Result>
  : Acc extends ''
  ? Result
  : [...Result, Acc]

/**
 * @example
 * splitToWords('camelCase') returns ['camel', 'Case']
 * splitToWords('PascalCase') returns ['Pascal', 'Case']
 * splitToWords('snake_case') returns ['snake', 'case']
 * splitToWords('SCREAMING_SNAKE_CASE') returns ['SCREAMING', 'SNAKE', 'CASE']
 * splitToWords('Title Case') returns ['Title', 'Case']
 * @example
 * splitToWords('block__element--modifier') returns ['block', 'element', 'modifier']
 * splitToWords('XMLHttpRequest') returns ['XML', 'Http', 'Request']
 * splitToWords('innerHTML') returns ['inner', 'HTML']
 * splitToWords('getXCoordinate') returns ['get', 'X', 'Coordinate']
 * splitToWords('') returns []
 */
export function splitToWords<const T extends string>(self: T): SplitToWords<T> {
  const result = []
  let current: string = self
  let acc = ''
  while (current.length > 0) {
    if (current.length >= 2 && isLowercaseLetter(current[0]!) && isUppercaseLetter(current[1]!)) {
      result.push(`${acc}${current[0]!}`)
      acc = ''
      current = current.slice(1)
    } else if (current.length >= 2 && isUppercaseLetter(current[0]!) && isLowercaseLetter(current[1]!)) {
      if (acc.length > 0) result.push(acc)

      acc = current[0]!
      current = current.slice(1)
    } else if (current.startsWith('-') || current.startsWith('_') || current.startsWith(' ')) {
      if (acc.length > 0) result.push(acc)
      acc = ''
      current = current.slice(1)
    } else {
      acc += current[0]!
      current = current.slice(1)
    }
  }
  if (acc.length > 0) result.push(acc)
  return result as any
}

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
