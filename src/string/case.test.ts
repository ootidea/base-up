import { expect, test } from 'vitest'
import { assertTypeEquality } from '../type'
import {
  capitalize,
  isLowercaseLetter,
  isUppercaseLetter,
  SplitIntoWords,
  splitIntoWords,
  toCamelCase,
  ToCamelCase,
  toCamelCasedPropertiesDeeply,
  ToCamelCasedPropertiesDeeply,
  toKebabCase,
  ToKebabCase,
  toSnakeCase,
  ToSnakeCase,
  ToSnakeCasedPropertiesDeeply,
  toSnakeCasedPropertiesDeeply,
} from './case'

test('isUppercaseLetter', () => {
  expect(isUppercaseLetter('A')).toBe(true)
  expect(isUppercaseLetter('a')).toBe(false)
  expect(isUppercaseLetter('1')).toBe(false)
  expect(isUppercaseLetter('AB')).toBe(false)
  expect(isUppercaseLetter('A ')).toBe(false)
})

test('isLowercaseLetter', () => {
  expect(isLowercaseLetter('a')).toBe(true)
  expect(isLowercaseLetter('A')).toBe(false)
  expect(isLowercaseLetter('1')).toBe(false)
  expect(isLowercaseLetter('ab')).toBe(false)
  expect(isLowercaseLetter('a ')).toBe(false)
})

test('capitalize', () => {
  expect(capitalize('')).toBe('')
  expect(capitalize('a')).toBe('A')
  expect(capitalize('A')).toBe('A')
  expect(capitalize('1')).toBe('1')
  expect(capitalize('abc')).toBe('Abc')
  expect(capitalize('ABC')).toBe('ABC')
})

test('SplitIntoWords', () => {
  assertTypeEquality<SplitIntoWords<'camelCase'>, ['camel', 'Case']>()
  assertTypeEquality<SplitIntoWords<'PascalCase'>, ['Pascal', 'Case']>()
  assertTypeEquality<SplitIntoWords<'kebab-case'>, ['kebab', 'case']>()
  assertTypeEquality<SplitIntoWords<'snake_case'>, ['snake', 'case']>()
  assertTypeEquality<SplitIntoWords<'SCREAMING_SNAKE_CASE'>, ['SCREAMING', 'SNAKE', 'CASE']>()
  assertTypeEquality<SplitIntoWords<'Title Case'>, ['Title', 'Case']>()
  assertTypeEquality<SplitIntoWords<'block__element--modifier'>, ['block', 'element', 'modifier']>()
  assertTypeEquality<SplitIntoWords<'XMLHttpRequest'>, ['XML', 'Http', 'Request']>()
  assertTypeEquality<SplitIntoWords<'innerHTML'>, ['inner', 'HTML']>()
  assertTypeEquality<SplitIntoWords<'HTML'>, ['HTML']>()
  assertTypeEquality<SplitIntoWords<'getXCoordinate'>, ['get', 'X', 'Coordinate']>()

  assertTypeEquality<SplitIntoWords<'camelCase' | 'PascalCase'>, ['camel', 'Case'] | ['Pascal', 'Case']>()
  assertTypeEquality<SplitIntoWords<''>, []>()
  assertTypeEquality<SplitIntoWords<string>, string[]>()
  assertTypeEquality<SplitIntoWords<any>, string[]>()
  assertTypeEquality<SplitIntoWords<never>, never>()
})

test('splitIntoWords', () => {
  expect(splitIntoWords('camelCase')).toStrictEqual(['camel', 'Case'])
  expect(splitIntoWords('PascalCase')).toStrictEqual(['Pascal', 'Case'])
  expect(splitIntoWords('kebab-case')).toStrictEqual(['kebab', 'case'])
  expect(splitIntoWords('snake_case')).toStrictEqual(['snake', 'case'])
  expect(splitIntoWords('SCREAMING_SNAKE_CASE')).toStrictEqual(['SCREAMING', 'SNAKE', 'CASE'])
  expect(splitIntoWords('Title Case')).toStrictEqual(['Title', 'Case'])
  expect(splitIntoWords('block__element--modifier')).toStrictEqual(['block', 'element', 'modifier'])
  expect(splitIntoWords('XMLHttpRequest')).toStrictEqual(['XML', 'Http', 'Request'])
  expect(splitIntoWords('innerHTML')).toStrictEqual(['inner', 'HTML'])
  expect(splitIntoWords('HTML')).toStrictEqual(['HTML'])
  expect(splitIntoWords('getXCoordinate')).toStrictEqual(['get', 'X', 'Coordinate'])

  expect(splitIntoWords('')).toStrictEqual([])
  expect(splitIntoWords('---')).toStrictEqual([])
})

test('ToSnakeCase', () => {
  assertTypeEquality<ToSnakeCase<'camelCase'>, 'camel_case'>()
  assertTypeEquality<ToSnakeCase<'PascalCase'>, 'pascal_case'>()
  assertTypeEquality<ToSnakeCase<'kebab-case'>, 'kebab_case'>()
  assertTypeEquality<ToSnakeCase<'snake_case'>, 'snake_case'>()
  assertTypeEquality<ToSnakeCase<'SCREAMING_SNAKE_CASE'>, 'screaming_snake_case'>()
  assertTypeEquality<ToSnakeCase<'Title Case'>, 'title_case'>()
  assertTypeEquality<ToSnakeCase<'block__element--modifier'>, 'block_element_modifier'>()
  assertTypeEquality<ToSnakeCase<'XMLHttpRequest'>, 'xml_http_request'>()
  assertTypeEquality<ToSnakeCase<'innerHTML'>, 'inner_html'>()
  assertTypeEquality<ToSnakeCase<'getXCoordinate'>, 'get_x_coordinate'>()

  assertTypeEquality<ToSnakeCase<'camelCase' | 'PascalCase'>, 'camel_case' | 'pascal_case'>()
  assertTypeEquality<ToSnakeCase<''>, ''>()
  assertTypeEquality<ToSnakeCase<'---'>, ''>()
  assertTypeEquality<ToSnakeCase<string>, string>()
  assertTypeEquality<ToSnakeCase<any>, string>()
  assertTypeEquality<ToSnakeCase<never>, never>()
})

test('toSnakeCase', () => {
  expect(toSnakeCase('camelCase')).toBe('camel_case')
  expect(toSnakeCase('PascalCase')).toBe('pascal_case')
  expect(toSnakeCase('kebab-case')).toBe('kebab_case')
  expect(toSnakeCase('snake_case')).toBe('snake_case')
  expect(toSnakeCase('SCREAMING_SNAKE_CASE')).toBe('screaming_snake_case')
  expect(toSnakeCase('Title Case')).toBe('title_case')
  expect(toSnakeCase('block__element--modifier')).toBe('block_element_modifier')
  expect(toSnakeCase('XMLHttpRequest')).toBe('xml_http_request')
  expect(toSnakeCase('innerHTML')).toBe('inner_html')
  expect(toSnakeCase('getXCoordinate')).toBe('get_x_coordinate')
})

test('ToKebabCase', () => {
  assertTypeEquality<ToKebabCase<'camelCase'>, 'camel-case'>()
  assertTypeEquality<ToKebabCase<'PascalCase'>, 'pascal-case'>()
  assertTypeEquality<ToKebabCase<'kebab-case'>, 'kebab-case'>()
  assertTypeEquality<ToKebabCase<'snake_case'>, 'snake-case'>()
  assertTypeEquality<ToKebabCase<'SCREAMING_SNAKE_CASE'>, 'screaming-snake-case'>()
  assertTypeEquality<ToKebabCase<'Title Case'>, 'title-case'>()
  assertTypeEquality<ToKebabCase<'block__element--modifier'>, 'block-element-modifier'>()
  assertTypeEquality<ToKebabCase<'XMLHttpRequest'>, 'xml-http-request'>()
  assertTypeEquality<ToKebabCase<'innerHTML'>, 'inner-html'>()
  assertTypeEquality<ToKebabCase<'getXCoordinate'>, 'get-x-coordinate'>()

  assertTypeEquality<ToKebabCase<'camelCase' | 'PascalCase'>, 'camel-case' | 'pascal-case'>()
  assertTypeEquality<ToKebabCase<''>, ''>()
  assertTypeEquality<ToKebabCase<'---'>, ''>()
  assertTypeEquality<ToKebabCase<string>, string>()
  assertTypeEquality<ToKebabCase<any>, string>()
  assertTypeEquality<ToKebabCase<never>, never>()
})

test('toKebabCase', () => {
  expect(toKebabCase('camelCase')).toBe('camel-case')
  expect(toKebabCase('PascalCase')).toBe('pascal-case')
  expect(toKebabCase('kebab-case')).toBe('kebab-case')
  expect(toKebabCase('snake_case')).toBe('snake-case')
  expect(toKebabCase('SCREAMING_SNAKE_CASE')).toBe('screaming-snake-case')
  expect(toKebabCase('Title Case')).toBe('title-case')
  expect(toKebabCase('block__element--modifier')).toBe('block-element-modifier')
  expect(toKebabCase('XMLHttpRequest')).toBe('xml-http-request')
  expect(toKebabCase('innerHTML')).toBe('inner-html')
  expect(toKebabCase('getXCoordinate')).toBe('get-x-coordinate')
})

test('ToCamelCase', () => {
  assertTypeEquality<ToCamelCase<'camelCase'>, 'camelCase'>()
  assertTypeEquality<ToCamelCase<'PascalCase'>, 'pascalCase'>()
  assertTypeEquality<ToCamelCase<'kebab-case'>, 'kebabCase'>()
  assertTypeEquality<ToCamelCase<'snake_case'>, 'snakeCase'>()
  assertTypeEquality<ToCamelCase<'SCREAMING_SNAKE_CASE'>, 'screamingSnakeCase'>()
  assertTypeEquality<ToCamelCase<'Title Case'>, 'titleCase'>()
  assertTypeEquality<ToCamelCase<'block__element--modifier'>, 'blockElementModifier'>()
  assertTypeEquality<ToCamelCase<'XMLHttpRequest'>, 'xmlHttpRequest'>()
  assertTypeEquality<ToCamelCase<'innerHTML'>, 'innerHtml'>()
  assertTypeEquality<ToCamelCase<'getXCoordinate'>, 'getXCoordinate'>()
})

test('toCamelCase', () => {
  expect(toCamelCase('camelCase')).toBe('camelCase')
  expect(toCamelCase('PascalCase')).toBe('pascalCase')
  expect(toCamelCase('kebab-case')).toBe('kebabCase')
  expect(toCamelCase('snake_case')).toBe('snakeCase')
  expect(toCamelCase('SCREAMING_SNAKE_CASE')).toBe('screamingSnakeCase')
  expect(toCamelCase('Title Case')).toBe('titleCase')
  expect(toCamelCase('block__element--modifier')).toBe('blockElementModifier')
  expect(toCamelCase('XMLHttpRequest')).toBe('xmlHttpRequest')
  expect(toCamelCase('innerHTML')).toBe('innerHtml')
  expect(toCamelCase('getXCoordinate')).toBe('getXCoordinate')
})

test('ToSnakeCasedPropertiesDeeply', () => {
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<{ createdAt: number }>, { created_at: number }>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<{ 0: { createdAt: number } }>, { 0: { created_at: number } }>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<{ readonly createdAt?: 1 }>, { readonly created_at?: 1 }>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<{ [Symbol.iterator]: undefined }>, { [Symbol.iterator]: undefined }>()

  assertTypeEquality<ToSnakeCasedPropertiesDeeply<{ createdAt: number }[]>, { created_at: number }[]>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<readonly boolean[]>, readonly boolean[]>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<readonly [1, 2]>, readonly [1, 2]>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<[string, { createdAt: number }]>, [string, { created_at: number }]>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<[[{ createdAt: number }]]>, [[{ created_at: number }]]>()

  assertTypeEquality<ToSnakeCasedPropertiesDeeply<1 | { createdAt: number }>, 1 | { created_at: number }>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<1 | { createdAt: number }[]>, 1 | { created_at: number }[]>()
  assertTypeEquality<
    ToSnakeCasedPropertiesDeeply<{ meta: { createdAt: number } | null }>,
    { meta: { created_at: number } | null }
  >()
  assertTypeEquality<
    ToSnakeCasedPropertiesDeeply<Record<number, { createdAt: number }>>,
    Record<number, { created_at: number }>
  >()

  assertTypeEquality<
    ToSnakeCasedPropertiesDeeply<{ createdAt: Date }>,
    { created_at: ToSnakeCasedPropertiesDeeply<Date> }
  >()

  assertTypeEquality<ToSnakeCasedPropertiesDeeply<null>, null>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<undefined>, undefined>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<never>, never>()
  assertTypeEquality<ToSnakeCasedPropertiesDeeply<any>, any>()
})

test('toSnakeCasedPropertiesDeeply', () => {
  expect(toSnakeCasedPropertiesDeeply({ createdAt: 1 })).toStrictEqual({ created_at: 1 })
  expect(toSnakeCasedPropertiesDeeply({ nested: { createdAt: 1 } })).toStrictEqual({ nested: { created_at: 1 } })
  expect(toSnakeCasedPropertiesDeeply([{ createdAt: 1 }])).toStrictEqual([{ created_at: 1 }])
  expect(toSnakeCasedPropertiesDeeply({ [Symbol.iterator]: undefined })).toStrictEqual({ [Symbol.iterator]: undefined })
  expect(toSnakeCasedPropertiesDeeply(null)).toStrictEqual(null)
  expect(toSnakeCasedPropertiesDeeply(undefined)).toStrictEqual(undefined)
  expect(toSnakeCasedPropertiesDeeply(123)).toStrictEqual(123)
  expect(toSnakeCasedPropertiesDeeply(parseInt)).toStrictEqual(parseInt)
})

test('ToCamelCasedPropertiesDeeply', () => {
  assertTypeEquality<ToCamelCasedPropertiesDeeply<{ created_at: number }>, { createdAt: number }>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<{ 0: { created_at: number } }>, { 0: { createdAt: number } }>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<{ readonly created_at?: 1 }>, { readonly createdAt?: 1 }>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<{ [Symbol.iterator]: undefined }>, { [Symbol.iterator]: undefined }>()

  assertTypeEquality<ToCamelCasedPropertiesDeeply<{ created_at: number }[]>, { createdAt: number }[]>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<readonly boolean[]>, readonly boolean[]>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<readonly [1, 2]>, readonly [1, 2]>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<[string, { created_at: number }]>, [string, { createdAt: number }]>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<[[{ created_at: number }]]>, [[{ createdAt: number }]]>()

  assertTypeEquality<ToCamelCasedPropertiesDeeply<1 | { created_at: number }>, 1 | { createdAt: number }>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<1 | { created_at: number }[]>, 1 | { createdAt: number }[]>()
  assertTypeEquality<
    ToCamelCasedPropertiesDeeply<{ meta: { created_at: number } | null }>,
    { meta: { createdAt: number } | null }
  >()
  assertTypeEquality<
    ToCamelCasedPropertiesDeeply<Record<number, { created_at: number }>>,
    Record<number, { createdAt: number }>
  >()

  assertTypeEquality<
    ToCamelCasedPropertiesDeeply<{ created_at: Date }>,
    { createdAt: ToCamelCasedPropertiesDeeply<Date> }
  >()

  assertTypeEquality<ToCamelCasedPropertiesDeeply<null>, null>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<undefined>, undefined>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<never>, never>()
  assertTypeEquality<ToCamelCasedPropertiesDeeply<any>, any>()
})

test('toCamelCasedPropertiesDeeply', () => {
  expect(toCamelCasedPropertiesDeeply({ created_at: 1 })).toStrictEqual({ createdAt: 1 })
  expect(toCamelCasedPropertiesDeeply({ nested: { created_at: 1 } })).toStrictEqual({ nested: { createdAt: 1 } })
  expect(toCamelCasedPropertiesDeeply([{ created_at: undefined }])).toStrictEqual([{ createdAt: undefined }])
  expect(toCamelCasedPropertiesDeeply({ [Symbol.iterator]: undefined })).toStrictEqual({ [Symbol.iterator]: undefined })
  expect(toCamelCasedPropertiesDeeply(null)).toStrictEqual(null)
  expect(toCamelCasedPropertiesDeeply(undefined)).toStrictEqual(undefined)
  expect(toCamelCasedPropertiesDeeply(123)).toStrictEqual(123)
  expect(toCamelCasedPropertiesDeeply(parseInt)).toStrictEqual(parseInt)
})
