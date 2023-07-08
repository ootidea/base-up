import { Tuple } from '../Array/other'
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
 * SplitIntoWords<''> is equivalent to []
 * SplitIntoWords<'kebab-case'> is equivalent to ['kebab', 'case']
 * SplitIntoWords<'snake_case'> is equivalent to ['snake', 'case']
 * SplitIntoWords<'PascalCase'> is equivalent to ['Pascal', 'Case']
 * SplitIntoWords<'camelCase'> is equivalent to ['camel', 'Case']
 * SplitIntoWords<'SCREAMING_SNAKE_CASE'> is equivalent to ['SCREAMING', 'SNAKE', 'CASE']
 * SplitIntoWords<'Title Case'> is equivalent to ['Title', 'Case']
 * @example
 * SplitIntoWords<'block__element--modifier'> is equivalent to ['block', 'element', 'modifier']
 * SplitIntoWords<`abc_${string}_xyz`> is equivalent to ['abc', string, 'xyz']
 * @example
 * SplitIntoWords<'iPhone'> is equivalent to ['i', 'Phone']
 */
export type SplitIntoWords<T extends string, D extends string = '-' | '_' | ' '> = IsOneOf<
  T,
  [string, any]
> extends true
  ? string[]
  : _SplitIntoWords<T, D>
type _SplitIntoWords<
  T extends string,
  D extends string,
  Acc extends string = '',
  Result extends string[] = []
> = T extends `${infer H1 extends LowercaseLetter}${infer H2 extends UppercaseLetter}${infer L}`
  ? _SplitIntoWords<`${H2}${L}`, D, '', [...Result, `${Acc}${H1}`]>
  : T extends `${infer H1 extends UppercaseLetter}${infer H2 extends LowercaseLetter}${infer L}`
  ? _SplitIntoWords<`${H2}${L}`, D, H1, Acc extends '' ? Result : [...Result, Acc]>
  : T extends `${D}${infer L}`
  ? _SplitIntoWords<L, D, '', Acc extends '' ? Result : [...Result, Acc]>
  : T extends `${infer H1}${infer L}`
  ? _SplitIntoWords<L, D, `${Acc}${H1}`, Result>
  : Acc extends ''
  ? Result
  : [...Result, Acc]

/**
 * @example
 * splitIntoWords('camelCase') returns ['camel', 'Case']
 * splitIntoWords('PascalCase') returns ['Pascal', 'Case']
 * splitIntoWords('snake_case') returns ['snake', 'case']
 * splitIntoWords('SCREAMING_SNAKE_CASE') returns ['SCREAMING', 'SNAKE', 'CASE']
 * splitIntoWords('Title Case') returns ['Title', 'Case']
 * @example
 * splitIntoWords('block__element--modifier') returns ['block', 'element', 'modifier']
 * splitIntoWords('XMLHttpRequest') returns ['XML', 'Http', 'Request']
 * splitIntoWords('innerHTML') returns ['inner', 'HTML']
 * splitIntoWords('getXCoordinate') returns ['get', 'X', 'Coordinate']
 * splitIntoWords('') returns []
 */
export function splitIntoWords<const T extends string, const D extends readonly string[] = ['-', '_', ' ']>(
  self: T,
  delimiters: D = ['-', '_', ' '] as any
): SplitIntoWords<T, D[number]> {
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
    } else {
      const matchedDelimiter = delimiters.find((delimiter) => current.startsWith(delimiter))
      if (matchedDelimiter !== undefined) {
        if (acc.length > 0) result.push(acc)
        acc = ''
        current = current.slice(matchedDelimiter.length)
      } else {
        acc += current[0]!
        current = current.slice(1)
      }
    }
  }
  if (acc.length > 0) result.push(acc)
  return result as any
}

/**
 * @example
 * ToSnakeCase<'camelCase'> is equivalent to 'camel_case'
 * ToSnakeCase<'PascalCase'> is equivalent to 'pascal_case'
 * ToSnakeCase<'kebab-case'> is equivalent to 'kebab_case'
 * ToSnakeCase<'SCREAMING_SNAKE_CASE'> is equivalent to 'screaming_snake_case'
 * ToSnakeCase<'Title Case'> is equivalent to 'title_case'
 * @example
 * ToSnakeCase<'block__element--modifier'> is equivalent to 'block_element_modifier'
 * ToSnakeCase<'XMLHttpRequest'> is equivalent to 'xml_http_request'
 * ToSnakeCase<'innerHTML'> is equivalent to 'inner_html'
 * ToSnakeCase<'getXCoordinate'> is equivalent to 'get_x_coordinate'
 * ToSnakeCase<'camelCase' | 'PascalCase'> is equivalent to 'camel_case' | 'pascal_case'
 */
export type ToSnakeCase<T extends string> = IsOneOf<T, [string, any]> extends true
  ? string
  : Lowercase<Join<SplitIntoWords<T>, '_'>>

/**
 * @example
 * ToKebabCase<'camelCase'> is equivalent to 'camel-case'
 * ToKebabCase<'PascalCase'> is equivalent to 'pascal-case'
 * ToKebabCase<'snake_case'> is equivalent to 'snake-case'
 * ToKebabCase<'SCREAMING_SNAKE_CASE'> is equivalent to 'screaming-snake-case'
 * ToKebabCase<'Title Case'> is equivalent to 'title-case'
 * @example
 * ToKebabCase<'block__element--modifier'> is equivalent to 'block-element-modifier'
 * ToKebabCase<'XMLHttpRequest'> is equivalent to 'xml-http-request'
 * ToKebabCase<'innerHTML'> is equivalent to 'inner-html'
 * ToKebabCase<'getXCoordinate'> is equivalent to 'get-x-coordinate'
 * ToKebabCase<'camelCase' | 'PascalCase'> is equivalent to 'camel-case' | 'pascal-case'
 */
export type ToKebabCase<T extends string> = IsOneOf<T, [string, any]> extends true
  ? string
  : Lowercase<Join<SplitIntoWords<T>, '-'>>

/**
 * @example
 * toKebabCase('camelCase') returns 'camel-case'
 * toKebabCase('PascalCase') returns 'pascal-case'
 * toKebabCase('snake_case') returns 'snake-case'
 * toKebabCase('SCREAMING_SNAKE_CASE') returns 'screaming-snake-case'
 * toKebabCase('Title Case') returns 'title-case'
 * @example
 * toKebabCase('block__element--modifier') returns 'block-element-modifier'
 * toKebabCase('XMLHttpRequest') returns 'xml-http-request'
 * toKebabCase('innerHTML') returns 'inner-html'
 * toKebabCase('getXCoordinate') returns 'get-x-coordinate'
 */
export function toKebabCase<const T extends string>(self: T): ToKebabCase<T> {
  return splitIntoWords(self).join('-').toLowerCase() as any
}

export type SnakeCasedPropertiesDeep<T extends object> = T extends T
  ? T extends Function
    ? T
    : T extends Tuple
    ? SnakeCasedPropertiesDeepTuple<T>
    : {
        [K in keyof T as K extends string ? ToSnakeCase<K> : K]: T[K] extends object
          ? SnakeCasedPropertiesDeep<T[K]>
          : T[K]
      }
  : never
type SnakeCasedPropertiesDeepTuple<T extends Tuple> = T extends T
  ? T extends any[]
    ? _SnakeCasedPropertiesDeepTuple<T>
    : Readonly<_SnakeCasedPropertiesDeepTuple<T>>
  : never
type _SnakeCasedPropertiesDeepTuple<T extends Tuple> = T extends readonly [infer H, ...infer L]
  ? [H extends object ? SnakeCasedPropertiesDeep<H> : H, ..._SnakeCasedPropertiesDeepTuple<L>]
  : T extends readonly [...infer L, infer H]
  ? [..._SnakeCasedPropertiesDeepTuple<L>, H extends object ? SnakeCasedPropertiesDeep<H> : H]
  : T extends readonly []
  ? []
  : T[number][] extends T
  ? SnakeCasedPropertiesDeep<T[number]>[]
  : T extends readonly [(infer H)?, ...infer L]
  ? [(H extends object ? SnakeCasedPropertiesDeep<H> : H)?, ..._SnakeCasedPropertiesDeepTuple<L>]
  : never
