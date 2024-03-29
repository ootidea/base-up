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
  toCamelCasedPropertiesDeep,
  ToCamelCasedPropertiesDeep,
  toKebabCase,
  ToKebabCase,
  toSnakeCase,
  ToSnakeCase,
  ToSnakeCasedPropertiesDeep,
  toSnakeCasedPropertiesDeep,
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

test('ToSnakeCasedPropertiesDeep', () => {
  assertTypeEquality<ToSnakeCasedPropertiesDeep<{ createdAt: number }>, { created_at: number }>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<{ 0: { createdAt: number } }>, { 0: { created_at: number } }>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<{ readonly createdAt?: 1 }>, { readonly created_at?: 1 }>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<{ [Symbol.iterator]: undefined }>, { [Symbol.iterator]: undefined }>()

  assertTypeEquality<ToSnakeCasedPropertiesDeep<{ createdAt: number }[]>, { created_at: number }[]>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<readonly boolean[]>, readonly boolean[]>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<readonly [1, 2]>, readonly [1, 2]>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<[string, { createdAt: number }]>, [string, { created_at: number }]>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<[[{ createdAt: number }]]>, [[{ created_at: number }]]>()

  assertTypeEquality<ToSnakeCasedPropertiesDeep<1 | { createdAt: number }>, 1 | { created_at: number }>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<1 | { createdAt: number }[]>, 1 | { created_at: number }[]>()
  assertTypeEquality<
    ToSnakeCasedPropertiesDeep<{ meta: { createdAt: number } | null }>,
    { meta: { created_at: number } | null }
  >()
  assertTypeEquality<
    ToSnakeCasedPropertiesDeep<Record<number, { createdAt: number }>>,
    Record<number, { created_at: number }>
  >()

  assertTypeEquality<
    ToSnakeCasedPropertiesDeep<{ createdAt: Date }>,
    { created_at: ToSnakeCasedPropertiesDeep<Date> }
  >()

  assertTypeEquality<ToSnakeCasedPropertiesDeep<null>, null>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<undefined>, undefined>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<never>, never>()
  assertTypeEquality<ToSnakeCasedPropertiesDeep<any>, any>()
})

test('toSnakeCasedPropertiesDeep', () => {
  expect(toSnakeCasedPropertiesDeep({ createdAt: 1 })).toStrictEqual({ created_at: 1 })
  expect(toSnakeCasedPropertiesDeep({ nested: { createdAt: 1 } })).toStrictEqual({ nested: { created_at: 1 } })
  expect(toSnakeCasedPropertiesDeep([{ createdAt: 1 }])).toStrictEqual([{ created_at: 1 }])
  expect(toSnakeCasedPropertiesDeep({ [Symbol.iterator]: undefined })).toStrictEqual({ [Symbol.iterator]: undefined })
  expect(toSnakeCasedPropertiesDeep(null)).toStrictEqual(null)
  expect(toSnakeCasedPropertiesDeep(undefined)).toStrictEqual(undefined)
  expect(toSnakeCasedPropertiesDeep(123)).toStrictEqual(123)
  expect(toSnakeCasedPropertiesDeep(parseInt)).toStrictEqual(parseInt)
})

test('ToCamelCasedPropertiesDeep', () => {
  assertTypeEquality<ToCamelCasedPropertiesDeep<{ created_at: number }>, { createdAt: number }>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<{ 0: { created_at: number } }>, { 0: { createdAt: number } }>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<{ readonly created_at?: 1 }>, { readonly createdAt?: 1 }>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<{ [Symbol.iterator]: undefined }>, { [Symbol.iterator]: undefined }>()

  assertTypeEquality<ToCamelCasedPropertiesDeep<{ created_at: number }[]>, { createdAt: number }[]>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<readonly boolean[]>, readonly boolean[]>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<readonly [1, 2]>, readonly [1, 2]>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<[string, { created_at: number }]>, [string, { createdAt: number }]>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<[[{ created_at: number }]]>, [[{ createdAt: number }]]>()

  assertTypeEquality<ToCamelCasedPropertiesDeep<1 | { created_at: number }>, 1 | { createdAt: number }>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<1 | { created_at: number }[]>, 1 | { createdAt: number }[]>()
  assertTypeEquality<
    ToCamelCasedPropertiesDeep<{ meta: { created_at: number } | null }>,
    { meta: { createdAt: number } | null }
  >()
  assertTypeEquality<
    ToCamelCasedPropertiesDeep<Record<number, { created_at: number }>>,
    Record<number, { createdAt: number }>
  >()

  assertTypeEquality<
    ToCamelCasedPropertiesDeep<{ created_at: Date }>,
    { createdAt: ToCamelCasedPropertiesDeep<Date> }
  >()

  assertTypeEquality<ToCamelCasedPropertiesDeep<null>, null>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<undefined>, undefined>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<never>, never>()
  assertTypeEquality<ToCamelCasedPropertiesDeep<any>, any>()
})

test('toCamelCasedPropertiesDeep', () => {
  expect(toCamelCasedPropertiesDeep({ created_at: 1 })).toStrictEqual({ createdAt: 1 })
  expect(toCamelCasedPropertiesDeep({ nested: { created_at: 1 } })).toStrictEqual({ nested: { createdAt: 1 } })
  expect(toCamelCasedPropertiesDeep([{ created_at: undefined }])).toStrictEqual([{ createdAt: undefined }])
  expect(toCamelCasedPropertiesDeep({ [Symbol.iterator]: undefined })).toStrictEqual({ [Symbol.iterator]: undefined })
  expect(toCamelCasedPropertiesDeep(null)).toStrictEqual(null)
  expect(toCamelCasedPropertiesDeep(undefined)).toStrictEqual(undefined)
  expect(toCamelCasedPropertiesDeep(123)).toStrictEqual(123)
  expect(toCamelCasedPropertiesDeep(parseInt)).toStrictEqual(parseInt)
})
