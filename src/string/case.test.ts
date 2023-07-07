import { expect, test } from 'vitest'
import { assertTypeEquality } from '../type'
import { isLowercaseLetter, isUppercaseLetter, SplitToWords, ToKebabCase } from './case'

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

test('SplitToWords', () => {
  assertTypeEquality<SplitToWords<'camelCase'>, ['camel', 'Case']>()
  assertTypeEquality<SplitToWords<'PascalCase'>, ['Pascal', 'Case']>()
  assertTypeEquality<SplitToWords<'kebab-case'>, ['kebab', 'case']>()
  assertTypeEquality<SplitToWords<'snake_case'>, ['snake', 'case']>()
  assertTypeEquality<SplitToWords<'SCREAMING_SNAKE_CASE'>, ['SCREAMING', 'SNAKE', 'CASE']>()
  assertTypeEquality<SplitToWords<'Title Case'>, ['Title', 'Case']>()
  assertTypeEquality<SplitToWords<'block__element--modifier'>, ['block', 'element', 'modifier']>()
  assertTypeEquality<SplitToWords<'XMLHttpRequest'>, ['XML', 'Http', 'Request']>()
  assertTypeEquality<SplitToWords<'innerHTML'>, ['inner', 'HTML']>()
  assertTypeEquality<SplitToWords<'getXCoordinate'>, ['get', 'X', 'Coordinate']>()

  assertTypeEquality<SplitToWords<'camelCase' | 'PascalCase'>, ['camel', 'Case'] | ['Pascal', 'Case']>()
  assertTypeEquality<SplitToWords<''>, []>()
  assertTypeEquality<SplitToWords<string>, string[]>()
  assertTypeEquality<SplitToWords<any>, string[]>()
  assertTypeEquality<SplitToWords<never>, never>()
})

test('ToSnakeCase', () => {
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
