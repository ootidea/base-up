import { expect, test } from 'vitest'
import { IsStringLiteral, IsTemplateLiteral, Split, toNumber, toString } from './string'
import { assertTypeEquality } from './type'

test('toNumber', () => {
  expect(toNumber('1.0')).toBe(1)
  expect(toNumber('-1')).toBe(-1)
  expect(toNumber('1_234')).toBeNaN()
  expect(toNumber('1,234')).toBeNaN()
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

test('Split', () => {
  assertTypeEquality<Split<'12:34', ':'>, ['12', '34']>()
  assertTypeEquality<Split<'12:34:56', ':'>, ['12', '34', '56']>()
  assertTypeEquality<Split<'12:34', '@'>, ['12:34']>()
  assertTypeEquality<Split<'//', '/'>, ['', '', '']>()

  assertTypeEquality<Split<'', 'a'>, ['']>()
  assertTypeEquality<Split<'', ''>, ['']>()
  assertTypeEquality<Split<'12:34', ''>, ['1', '2', ':', '3', '4']>()

  assertTypeEquality<Split<`${number}:${number}`, ':'>, [`${number}`, `${number}`]>()
  assertTypeEquality<Split<`0${number}:1${number}`, ':'>, [`0${number}`, `1${number}`]>()
})
