import { Tuple } from '../Array/other'
import { Join } from '../transform'
import { Equals, IsOneOf } from '../typePredicate'

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
 * Convert the first character to uppercase.
 * @example
 * capitalize('hello') returns 'Hello'
 * capitalize('HTML') returns 'HTML'
 * capitalize('') returns ''
 * capitalize('123') returns '123'
 */
export function capitalize<const T extends string>(self: T): Capitalize<T> {
  if (self === '') return '' as any

  return (self[0]!.toUpperCase() + self.slice(1)) as any
}

/**
 * Splits a string in formats like snake_case or PascalCase into words.
 * Words such as 'iPhone' are not correctly recognized.
 * @example
 * SplitIntoWords<''> equals []
 * SplitIntoWords<'kebab-case'> equals ['kebab', 'case']
 * SplitIntoWords<'snake_case'> equals ['snake', 'case']
 * SplitIntoWords<'PascalCase'> equals ['Pascal', 'Case']
 * SplitIntoWords<'camelCase'> equals ['camel', 'Case']
 * SplitIntoWords<'SCREAMING_SNAKE_CASE'> equals ['SCREAMING', 'SNAKE', 'CASE']
 * SplitIntoWords<'Title Case'> equals ['Title', 'Case']
 * @example
 * SplitIntoWords<'block__element--modifier'> equals ['block', 'element', 'modifier']
 * SplitIntoWords<`abc_${string}_xyz`> equals ['abc', string, 'xyz']
 * @example
 * SplitIntoWords<'iPhone'> equals ['i', 'Phone']
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
  Result extends string[] = [],
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
  separators: D = ['-', '_', ' '] as any,
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
      const matchedSeparator = separators.find((separator) => current.startsWith(separator))
      if (matchedSeparator !== undefined) {
        if (acc.length > 0) result.push(acc)
        acc = ''
        current = current.slice(matchedSeparator.length)
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
 * ToSnakeCase<'camelCase'> equals 'camel_case'
 * ToSnakeCase<'PascalCase'> equals 'pascal_case'
 * ToSnakeCase<'kebab-case'> equals 'kebab_case'
 * ToSnakeCase<'SCREAMING_SNAKE_CASE'> equals 'screaming_snake_case'
 * ToSnakeCase<'Title Case'> equals 'title_case'
 * @example
 * ToSnakeCase<'block__element--modifier'> equals 'block_element_modifier'
 * ToSnakeCase<'XMLHttpRequest'> equals 'xml_http_request'
 * ToSnakeCase<'innerHTML'> equals 'inner_html'
 * ToSnakeCase<'getXCoordinate'> equals 'get_x_coordinate'
 * ToSnakeCase<'camelCase' | 'PascalCase'> equals 'camel_case' | 'pascal_case'
 */
export type ToSnakeCase<T extends string> = IsOneOf<T, [string, any]> extends true
  ? string
  : Lowercase<Join<SplitIntoWords<T>, '_'>>

/**
 * @example
 * toSnakeCase('camelCase') returns 'camel_case'
 * toSnakeCase('PascalCase') returns 'pascal_case'
 * toSnakeCase('kebab-case') returns 'kebab_case'
 * toSnakeCase('SCREAMING_SNAKE_CASE') returns 'screaming_snake_case'
 * toSnakeCase('Title Case') returns 'title_case'
 * @example
 * toSnakeCase('block__element--modifier') returns 'block_element_modifier'
 * toSnakeCase('XMLHttpRequest') returns 'xml_http_request'
 * toSnakeCase('innerHTML') returns 'inner_html'
 * toSnakeCase('getXCoordinate') returns 'get_x_coordinate'
 */
export function toSnakeCase<const T extends string>(self: T): ToSnakeCase<T> {
  return splitIntoWords(self).join('_').toLowerCase() as any
}

/**
 * @example
 * ToKebabCase<'camelCase'> equals 'camel-case'
 * ToKebabCase<'PascalCase'> equals 'pascal-case'
 * ToKebabCase<'snake_case'> equals 'snake-case'
 * ToKebabCase<'SCREAMING_SNAKE_CASE'> equals 'screaming-snake-case'
 * ToKebabCase<'Title Case'> equals 'title-case'
 * @example
 * ToKebabCase<'block__element--modifier'> equals 'block-element-modifier'
 * ToKebabCase<'XMLHttpRequest'> equals 'xml-http-request'
 * ToKebabCase<'innerHTML'> equals 'inner-html'
 * ToKebabCase<'getXCoordinate'> equals 'get-x-coordinate'
 * ToKebabCase<'camelCase' | 'PascalCase'> equals 'camel-case' | 'pascal-case'
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

/**
 * @example
 * ToCamelCase<'PascalCase'> equals 'pascalCase'
 * ToCamelCase<'snake_case'> equals 'snakeCase'
 * ToCamelCase<'kebab-case'> equals 'kebabCase'
 * ToCamelCase<'SCREAMING_SNAKE_CASE'> equals 'screamingSnakeCase'
 * ToCamelCase<'Title Case'> equals 'titleCase'
 * @example
 * ToCamelCase<'block__element--modifier'> equals 'blockElementModifier'
 * ToCamelCase<'XMLHttpRequest'> equals 'xmlHttpRequest'
 * ToCamelCase<'innerHTML'> equals 'innerHtml'
 * ToCamelCase<'getXCoordinate'> equals 'getXCoordinate'
 */
export type ToCamelCase<T extends string> = IsOneOf<T, [string, any]> extends true
  ? string
  : SplitIntoWords<T> extends readonly [infer H extends string, ...infer L extends readonly string[]]
  ? Join<[Lowercase<H>, ...PascalizeAll<L>], ''>
  : ''
type PascalizeAll<T extends readonly string[]> = T extends readonly [
  infer H extends string,
  ...infer L extends readonly string[],
]
  ? [Capitalize<Lowercase<H>>, ...PascalizeAll<L>]
  : []

/**
 * @example
 * toCamelCase('PascalCase') returns 'pascalCase'
 * toCamelCase('snake_case') returns 'snakeCase'
 * toCamelCase('kebab-case') returns 'kebabCase'
 * toCamelCase('SCREAMING_SNAKE_CASE') returns 'screamingSnakeCase'
 * toCamelCase('Title Case') returns 'titleCase'
 * @example
 * toCamelCase('block__element--modifier') returns 'blockElementModifier'
 * toCamelCase('XMLHttpRequest') returns 'xmlHttpRequest'
 * toCamelCase('innerHTML') returns 'innerHtml'
 * toCamelCase('getXCoordinate') returns 'getXCoordinate'
 */
export function toCamelCase<const T extends string>(self: T): ToCamelCase<T> {
  const [first, ...rest] = splitIntoWords(self)
  if (first === undefined) return '' as any

  return [first.toLowerCase(), ...rest.map((word) => capitalize(word.toLowerCase()))].join('') as any
}

/**
 * @example
 * ToSnakeCasedPropertiesDeep<{ firstName: string, lastName: string }> equals { first_name: string, last_name: string }
 * ToSnakeCasedPropertiesDeep<{ nested: { firstName: string } }> equals { nested: { first_name: string } }
 * ToSnakeCasedPropertiesDeep<{ tags: { createdAt: number }[] }> equals { tags: { created_at: number }[] }
 * ToSnakeCasedPropertiesDeep<{ firstName: string }[]> equals { first_name: string }[]
 * @example keep modifiers
 * ToSnakeCasedPropertiesDeep<{ readonly firstName?: string }> equals { readonly first_name?: string }
 * ToSnakeCasedPropertiesDeep<readonly string[]> equals readonly string[]
 */
export type ToSnakeCasedPropertiesDeep<T> = Equals<T, any> extends true
  ? T
  : T extends Function
  ? T
  : T extends Tuple
  ? ToSnakeCasedPropertiesDeepTuple<T>
  : {
      [K in keyof T as K extends string ? ToSnakeCase<K> : K]: ToSnakeCasedPropertiesDeep<T[K]>
    }
type ToSnakeCasedPropertiesDeepTuple<T extends Tuple> = T extends any[]
  ? _ToSnakeCasedPropertiesDeepTuple<T>
  : Readonly<_ToSnakeCasedPropertiesDeepTuple<T>>
type _ToSnakeCasedPropertiesDeepTuple<T extends Tuple> = T extends readonly [infer H, ...infer L]
  ? [ToSnakeCasedPropertiesDeep<H>, ..._ToSnakeCasedPropertiesDeepTuple<L>]
  : T extends readonly [...infer L, infer H]
  ? [..._ToSnakeCasedPropertiesDeepTuple<L>, ToSnakeCasedPropertiesDeep<H>]
  : T extends readonly []
  ? []
  : T[number][] extends T
  ? ToSnakeCasedPropertiesDeep<T[number]>[]
  : T extends readonly [(infer H)?, ...infer L]
  ? [ToSnakeCasedPropertiesDeep<H>?, ..._ToSnakeCasedPropertiesDeepTuple<L>]
  : never

/**
 * @example
 * toSnakeCasedPropertiesDeep({ firstName: 'John', lastName: 'Smith' }) returns { first_name: 'John', last_name: 'Smith' }
 * toSnakeCasedPropertiesDeep({ nested: { firstName: 'John' } }) returns { nested: { first_name: 'John' } }
 * toSnakeCasedPropertiesDeep({ tags: [{ createdAt: 1 }] }) returns { tags: [{ created_at: 1 }] }
 * toSnakeCasedPropertiesDeep([{ firstName: 'John' }]) returns [{ first_name: 'John' }]
 * toSnakeCasedPropertiesDeep(null) returns null
 */
export function toSnakeCasedPropertiesDeep<const T>(self: T): ToSnakeCasedPropertiesDeep<T> {
  if (self instanceof Array) {
    return self.map(toSnakeCasedPropertiesDeep) as any
  }

  if (typeof self !== 'object' || self === null) return self as any

  const result: any = { ...self }
  for (const key of Object.keys(self)) {
    const snakeCase = toSnakeCase(key)
    const value = result[key]
    result[snakeCase] = toSnakeCasedPropertiesDeep(value)
    if (key !== snakeCase) {
      delete result[key]
    }
  }
  return result
}

/**
 * @example
 * ToCamelCasedPropertiesDeep<{ first_name: string, last_name: string }> equals { firstName: string, lastName: string }
 * ToCamelCasedPropertiesDeep<{ nested: { first_name: string } }> equals { nested: { firstName: string } }
 * ToCamelCasedPropertiesDeep<{ tags: { created_at: number }[] }> equals { tags: { createdAt: number }[] }
 * ToCamelCasedPropertiesDeep<{ first_name: string }[]> equals { firstName: string }[]
 * @example keep modifiers
 * ToCamelCasedPropertiesDeep<{ readonly first_name?: string }> equals { readonly firstName?: string }
 * ToCamelCasedPropertiesDeep<readonly string[]> equals readonly string[]
 */
export type ToCamelCasedPropertiesDeep<T> = Equals<T, any> extends true
  ? T
  : T extends Function
  ? T
  : T extends Tuple
  ? ToCamelCasedPropertiesDeepTuple<T>
  : {
      [K in keyof T as K extends string ? ToCamelCase<K> : K]: ToCamelCasedPropertiesDeep<T[K]>
    }
type ToCamelCasedPropertiesDeepTuple<T extends Tuple> = T extends any[]
  ? _ToCamelCasedPropertiesDeepTuple<T>
  : Readonly<_ToCamelCasedPropertiesDeepTuple<T>>
type _ToCamelCasedPropertiesDeepTuple<T extends Tuple> = T extends readonly [infer H, ...infer L]
  ? [ToCamelCasedPropertiesDeep<H>, ..._ToCamelCasedPropertiesDeepTuple<L>]
  : T extends readonly [...infer L, infer H]
  ? [..._ToCamelCasedPropertiesDeepTuple<L>, ToCamelCasedPropertiesDeep<H>]
  : T extends readonly []
  ? []
  : T[number][] extends T
  ? ToCamelCasedPropertiesDeep<T[number]>[]
  : T extends readonly [(infer H)?, ...infer L]
  ? [ToCamelCasedPropertiesDeep<H>?, ..._ToCamelCasedPropertiesDeepTuple<L>]
  : never

/**
 * @example
 * toCamelCasedPropertiesDeep({ first_name: 'John', last_name: 'Smith' }) returns { firstName: 'John', lastName: 'Smith' }
 * toCamelCasedPropertiesDeep({ nested: { first_name: 'John' } }) returns { nested: { firstName: 'John' } }
 * toCamelCasedPropertiesDeep({ tags: [{ created_at: 1 }] }) returns { tags: [{ createdAt: 1 }] }
 * toCamelCasedPropertiesDeep([{ first_name: 'John' }]) returns [{ firstName: 'John' }]
 * toCamelCasedPropertiesDeep(null) returns null
 */
export function toCamelCasedPropertiesDeep<const T>(self: T): ToCamelCasedPropertiesDeep<T> {
  if (self instanceof Array) {
    return self.map(toCamelCasedPropertiesDeep) as any
  }

  if (typeof self !== 'object' || self === null) return self as any

  const result: any = { ...self }
  for (const key of Object.keys(self)) {
    const camelCase = toCamelCase(key)
    const value = result[key]
    result[camelCase] = toCamelCasedPropertiesDeep(value)
    if (key !== camelCase) {
      delete result[key]
    }
  }
  return result
}
