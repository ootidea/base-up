import { expect, test } from 'vitest'
import { Infinity, NegativeInfinity } from './number/other'
import {
  IsStringLiteral,
  IsTemplateLiteral,
  Join,
  Split,
  SplitToWords,
  ToKebabCase,
  toNumber,
  ToNumber,
  toString,
} from './string'
import { assertTypeEquality } from './type'

test('toNumber', () => {
  expect(toNumber('-1')).toBe(-1)
  expect(toNumber('1.0')).toBe(1)
  expect(toNumber('-1.2')).toBe(-1.2)
  expect(toNumber('001')).toBe(1)
  expect(toNumber('-00')).toBe(-0)
  expect(toNumber('1e+100')).toBe(1e100)
  expect(toNumber('1e-100')).toBe(1e-100)
  expect(toNumber('-1e+100')).toBe(-1e100)
  expect(toNumber('-1e-100')).toBe(-1e-100)
  expect(toNumber('Infinity')).toBe(Infinity)
  expect(toNumber('-Infinity')).toBe(-Infinity)

  expect(toNumber('1px')).toBeNaN()
  expect(toNumber('1_234')).toBeNaN()
  expect(toNumber('1,234')).toBeNaN()
})

test('ToNumber', () => {
  assertTypeEquality<ToNumber<'0'>, 0>()
  assertTypeEquality<ToNumber<'1'>, 1>()
  assertTypeEquality<ToNumber<'-1'>, -1>()
  assertTypeEquality<ToNumber<'1e+100'>, 1e100>()
  assertTypeEquality<ToNumber<'1e-100'>, 1e-100>()
  assertTypeEquality<ToNumber<'-1e+100'>, -1e100>()
  assertTypeEquality<ToNumber<'-1e-100'>, -1e-100>()
  assertTypeEquality<ToNumber<'Infinity'>, Infinity>()
  assertTypeEquality<ToNumber<'-Infinity'>, NegativeInfinity>()

  assertTypeEquality<ToNumber<'00'>, 0>()
  assertTypeEquality<ToNumber<'001'>, 1>()
  assertTypeEquality<ToNumber<'-0'>, 0>()
  assertTypeEquality<ToNumber<'-00'>, 0>()
  assertTypeEquality<ToNumber<'-001'>, -1>()
  assertTypeEquality<ToNumber<'1_234'>, number>()
  assertTypeEquality<ToNumber<'1,234'>, number>()
  assertTypeEquality<ToNumber<'1px'>, number>()
  assertTypeEquality<ToNumber<'abc'>, number>()
})

test('toString', () => {
  expect(toString('abc')).toBe('abc')
  expect(toString(123)).toBe('123')
  expect(toString(123n)).toBe('123')
  expect(toString(1.0)).toBe('1')
  expect(toString(NaN)).toBe('NaN')
  expect(toString(Infinity)).toBe('Infinity')
  expect(toString(true)).toBe('true')
  expect(toString(null)).toBe('null')
  expect(toString(undefined)).toBe('undefined')
  expect(toString([])).toBe('')
})

test('IsTemplateLiteral', () => {
  assertTypeEquality<IsTemplateLiteral<`${number}`>, true>()
  assertTypeEquality<IsTemplateLiteral<`${bigint}`>, true>()
  assertTypeEquality<IsTemplateLiteral<`Hi, ${string}`>, true>()
  assertTypeEquality<IsTemplateLiteral<`${number}px`>, true>()
  assertTypeEquality<IsTemplateLiteral<`#${bigint}:`>, true>()
  assertTypeEquality<IsTemplateLiteral<`${number}` | `${bigint}`>, false>()
  assertTypeEquality<IsTemplateLiteral<'abc'>, false>()
  assertTypeEquality<IsTemplateLiteral<``>, false>()
  assertTypeEquality<IsTemplateLiteral<`${null}`>, false>()
  assertTypeEquality<IsTemplateLiteral<`${undefined}`>, false>()
  assertTypeEquality<IsTemplateLiteral<`${boolean}`>, false>()
  assertTypeEquality<IsTemplateLiteral<string>, false>()
  assertTypeEquality<IsTemplateLiteral<any>, false>()
  assertTypeEquality<IsTemplateLiteral<never>, false>()
})

test('IsStringLiteral', () => {
  assertTypeEquality<IsStringLiteral<'a'>, true>()
  assertTypeEquality<IsStringLiteral<''>, true>()
  assertTypeEquality<IsStringLiteral<string>, false>()
  assertTypeEquality<IsStringLiteral<never>, false>()
  assertTypeEquality<IsStringLiteral<any>, false>()
  assertTypeEquality<IsStringLiteral<'a' | 'b'>, false>()
  assertTypeEquality<IsStringLiteral<`${null}`>, true>()
  assertTypeEquality<IsStringLiteral<`${undefined}`>, true>()
  assertTypeEquality<IsStringLiteral<`${boolean}`>, false>()
  assertTypeEquality<IsStringLiteral<`${number}`>, false>()
  assertTypeEquality<IsStringLiteral<`${bigint}`>, false>()
})

test('Join', () => {
  assertTypeEquality<Join<[]>, ''>()
  assertTypeEquality<Join<['a']>, 'a'>()
  assertTypeEquality<Join<['a', 'b']>, 'a,b'>()

  assertTypeEquality<Join<['a', 'b'], '.' | '/'>, 'a.b' | 'a/b'>()
  assertTypeEquality<Join<['a', 'b'], string>, `a${string}b`>()
  assertTypeEquality<Join<['a' | '0', 'b']>, 'a,b' | '0,b'>()
  assertTypeEquality<Join<['a', 'b'] | ['0']>, 'a,b' | '0'>()

  assertTypeEquality<Join<string[]>, string>()
  assertTypeEquality<Join<'1'[]>, string>()
  assertTypeEquality<Join<any>, string>()
  assertTypeEquality<Join<never>, never>()
})

test('Split', () => {
  assertTypeEquality<Split<'12:34', ':'>, ['12', '34']>()
  assertTypeEquality<Split<'a, b, c', ', '>, ['a', 'b', 'c']>()
  assertTypeEquality<Split<'12:34', '@'>, ['12:34']>()
  assertTypeEquality<Split<'//', '/'>, ['', '', '']>()

  assertTypeEquality<Split<'', 'a'>, ['']>()
  assertTypeEquality<Split<'', ''>, ['']>()
  assertTypeEquality<Split<'12:34', ''>, ['1', '2', ':', '3', '4']>()

  assertTypeEquality<Split<`${number}:${number}`, ':'>, [`${number}`, `${number}`]>()
  assertTypeEquality<Split<`0${number}:1${number}`, ':'>, [`0${number}`, `1${number}`]>()
})

test('SplitToWords', () => {
  assertTypeEquality<SplitToWords<'camelCase'>, ['camel', 'Case']>()
  assertTypeEquality<SplitToWords<'PascalCase'>, ['Pascal', 'Case']>()
  assertTypeEquality<SplitToWords<'kebab-case'>, ['kebab', 'case']>()
  assertTypeEquality<SplitToWords<'snake_case'>, ['snake', 'case']>()
  assertTypeEquality<SplitToWords<'SCREAMING_SNAKE_CASE'>, ['SCREAMING', 'SNAKE', 'CASE']>()
  assertTypeEquality<SplitToWords<'Title Case'>, ['Title', 'Case']>()
  assertTypeEquality<SplitToWords<'block__element--modifier'>, ['block', 'element', 'modifier']>()

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

  assertTypeEquality<ToKebabCase<'camelCase' | 'PascalCase'>, 'camel-case' | 'pascal-case'>()
  assertTypeEquality<ToKebabCase<''>, ''>()
  assertTypeEquality<ToKebabCase<'---'>, ''>()
  assertTypeEquality<ToKebabCase<string>, string>()
  assertTypeEquality<ToKebabCase<any>, string>()
  assertTypeEquality<ToKebabCase<never>, never>()
})
