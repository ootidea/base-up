import { expect, test } from 'vitest'
import { Infinity, NegativeInfinity } from '../number/other'
import { assertTypeEquality } from '../type'
import {
  IsStringLiteral,
  IsTemplateLiteral,
  ToNumber,
  toNumber,
  toString,
  trim,
  Trim,
  trimEnd,
  TrimEnd,
  trimStart,
  TrimStart,
} from './other'

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

test('TrimStart', () => {
  assertTypeEquality<TrimStart<''>, ''>()
  assertTypeEquality<TrimStart<'   0'>, '0'>()
  assertTypeEquality<TrimStart<'\nabc\n'>, 'abc\n'>()
  assertTypeEquality<TrimStart<`\r${number}px`>, `${number}px`>()

  assertTypeEquality<TrimStart<' abc' | '\t123'>, 'abc' | '123'>()
  assertTypeEquality<TrimStart<string>, string>()
  assertTypeEquality<TrimStart<any>, string>()
  assertTypeEquality<TrimStart<never>, never>()
})

test('trimStart', () => {
  expect(trimStart('   abc')).toBe('abc')
  expect(trimStart('\nabc\n')).toBe('abc\n')
  expect(trimStart('')).toBe('')
})

test('TrimEnd', () => {
  assertTypeEquality<TrimEnd<''>, ''>()
  assertTypeEquality<TrimEnd<'0   '>, '0'>()
  assertTypeEquality<TrimEnd<'abc\n'>, 'abc'>()
  assertTypeEquality<TrimEnd<`${number}px\r`>, `${number}px`>()

  assertTypeEquality<TrimEnd<'abc ' | '123\t'>, 'abc' | '123'>()
  assertTypeEquality<TrimEnd<string>, string>()
  assertTypeEquality<TrimEnd<any>, string>()
  assertTypeEquality<TrimEnd<never>, never>()
})

test('trimEnd', () => {
  expect(trimEnd('abc   ')).toBe('abc')
  expect(trimEnd('\nabc\n')).toBe('\nabc')
  expect(trimEnd('')).toBe('')
})

test('Trim', () => {
  assertTypeEquality<Trim<''>, ''>()
  assertTypeEquality<Trim<' abc '>, 'abc'>()
  assertTypeEquality<Trim<`\r${number}px`>, `${number}px`>()
  assertTypeEquality<Trim<`${number}px\r`>, `${number}px`>()

  assertTypeEquality<Trim<' abc ' | '\t123\t'>, 'abc' | '123'>()
  assertTypeEquality<Trim<string>, string>()
  assertTypeEquality<Trim<any>, string>()
  assertTypeEquality<Trim<never>, never>()
})

test('trim', () => {
  expect(trim(' abc ')).toBe('abc')
  expect(trim('\nabc\n')).toBe('abc')
  expect(trim('')).toBe('')
})
