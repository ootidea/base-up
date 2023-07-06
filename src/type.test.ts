import { expect, expectTypeOf, test } from 'vitest'
import {
  assertTypeEquality,
  DiscriminatedUnion,
  IsEqual,
  isFalsy,
  isInstanceOf,
  IsOneOf,
  isTruthy,
  Nominal,
  Simplify,
  ToBasePrimitiveType,
} from './type'

test('IsEqual', () => {
  assertTypeEquality<IsEqual<'abc', 'abc'>, true>()
  assertTypeEquality<IsEqual<1, number>, false>()
  assertTypeEquality<IsEqual<any, unknown>, false>()
  assertTypeEquality<IsEqual<any, never>, false>()
  assertTypeEquality<IsEqual<unknown, never>, false>()
  assertTypeEquality<IsEqual<void, undefined>, false>()

  assertTypeEquality<IsEqual<1 | 2, 2 | 1>, true>()
  assertTypeEquality<IsEqual<1 | never, 1>, true>()
  assertTypeEquality<IsEqual<boolean, true | false>, true>()

  assertTypeEquality<IsEqual<string & {}, string>, false>()
  assertTypeEquality<IsEqual<string & {}, {}>, false>()

  assertTypeEquality<IsEqual<[a: string], [b: string]>, true>()
  assertTypeEquality<IsEqual<[string?], [] | [string]>, false>()
  assertTypeEquality<IsEqual<[string, ...string[]], [...string[], string]>, false>()
})

test('IsOneOf', () => {
  assertTypeEquality<IsOneOf<string, [string, number]>, true>()
  assertTypeEquality<IsOneOf<string, [number, bigint]>, false>()
  assertTypeEquality<IsOneOf<string, [any, unknown, never]>, false>()
  assertTypeEquality<IsOneOf<string, [string | number]>, false>()
  assertTypeEquality<IsOneOf<'text', [string]>, false>()
  assertTypeEquality<IsOneOf<any, []>, false>()
})

test('isTruthy', () => {
  expect(isTruthy(false)).toBe(false)
  expect(isTruthy(null)).toBe(false)
  expect(isTruthy(undefined)).toBe(false)
  expect(isTruthy(0)).toBe(false)
  expect(isTruthy(0n)).toBe(false)
  expect(isTruthy('')).toBe(false)
  expect(isTruthy(NaN)).toBe(false)

  expect(isTruthy(1)).toBe(true)
  expect(isTruthy(1n)).toBe(true)
  expect(isTruthy('a')).toBe(true)
  expect(isTruthy({})).toBe(true)
  expect(isTruthy([])).toBe(true)
  expect(isTruthy(() => {})).toBe(true)

  expectTypeOf(isTruthy(false)).toEqualTypeOf<false>()
  expectTypeOf(isTruthy(null)).toEqualTypeOf<false>()
  expectTypeOf(isTruthy(undefined)).toEqualTypeOf<false>()
  expectTypeOf(isTruthy(0)).toEqualTypeOf<false>()
  expectTypeOf(isTruthy(0n)).toEqualTypeOf<false>()
  expectTypeOf(isTruthy('')).toEqualTypeOf<false>()

  expectTypeOf(isTruthy(1)).toEqualTypeOf<boolean>()
  expectTypeOf(isTruthy(NaN)).toEqualTypeOf<boolean>()
  expectTypeOf(isTruthy({})).toEqualTypeOf<boolean>()
  expectTypeOf(isTruthy([])).toEqualTypeOf<boolean>()
})

test('isFalsy', () => {
  expect(isFalsy(false)).toBe(true)
  expect(isFalsy(null)).toBe(true)
  expect(isFalsy(undefined)).toBe(true)
  expect(isFalsy(0)).toBe(true)
  expect(isFalsy(0n)).toBe(true)
  expect(isFalsy('')).toBe(true)
  expect(isFalsy(NaN)).toBe(true)

  expect(isFalsy(1)).toBe(false)
  expect(isFalsy(1n)).toBe(false)
  expect(isFalsy('a')).toBe(false)
  expect(isFalsy({})).toBe(false)
  expect(isFalsy([])).toBe(false)
  expect(isFalsy(() => {})).toBe(false)
})

test('isInstanceOf', () => {
  expect(isInstanceOf([], Array)).toBe(true)
  expect(isInstanceOf(/a/, RegExp)).toBe(true)
  expect(isInstanceOf('2021-09-27T15:08:10.78', Date)).toBe(false)
  expect(isInstanceOf({}, Object)).toBe(true)
})

test('isInstanceOf.defer', () => {
  expect(isInstanceOf.defer(Array)([])).toBe(true)
  expect(isInstanceOf.defer(RegExp)(/a/)).toBe(true)
  expect(isInstanceOf.defer(Date)('2021-09-27T15:08:10.78')).toBe(false)
  expect(isInstanceOf.defer(Object)({})).toBe(true)
})

test('Nominal', () => {
  type UserId = Nominal<number, 'UserId'>
  type PostId = Nominal<number, 'PostId'>

  const userId: UserId = 1 as UserId
  const rawNumber: number = 1

  expectTypeOf(userId).toMatchTypeOf<number>()
  expectTypeOf(userId).toMatchTypeOf<UserId>()
  expectTypeOf(userId).not.toMatchTypeOf<PostId>()
  expectTypeOf(rawNumber).not.toMatchTypeOf<UserId>()
})

test('Simplify', () => {
  assertTypeEquality<Simplify<{ name: string } & { age: number }>, { name: string; age: number }>()
  assertTypeEquality<Simplify<{}>, {}>()
  assertTypeEquality<IsEqual<Simplify<string & {}>, string>, false>()

  assertTypeEquality<Simplify<1>, 1>()
  assertTypeEquality<Simplify<null>, null>()
  assertTypeEquality<Simplify<any>, any>()
  assertTypeEquality<Simplify<unknown>, unknown>()
  assertTypeEquality<Simplify<never>, never>()

  assertTypeEquality<Simplify<1 | 2>, 1 | 2>()
  assertTypeEquality<
    Simplify<{ size: number } | ({ name: string } & { age: number })>,
    { size: number } | { name: string; age: number }
  >()

  assertTypeEquality<Simplify<any[]>, any[]>()
  assertTypeEquality<Simplify<readonly any[]>, readonly any[]>()
  assertTypeEquality<Simplify<[1, 2]>, [1, 2]>()
  assertTypeEquality<Simplify<[1, ...2[]]>, [1, ...2[]]>()
  assertTypeEquality<Simplify<[1?]>, [1?]>()
})

test('ToBasePrimitiveType', () => {
  assertTypeEquality<ToBasePrimitiveType<'a'>, string>()
  assertTypeEquality<ToBasePrimitiveType<1>, number>()
  assertTypeEquality<ToBasePrimitiveType<1n>, bigint>()
  assertTypeEquality<ToBasePrimitiveType<true>, boolean>()
  const mySymbol = Symbol()
  assertTypeEquality<ToBasePrimitiveType<typeof mySymbol>, symbol>()
  assertTypeEquality<ToBasePrimitiveType<null>, null>()
  assertTypeEquality<ToBasePrimitiveType<undefined>, undefined>()

  assertTypeEquality<ToBasePrimitiveType<string>, string>()
  assertTypeEquality<ToBasePrimitiveType<number>, number>()
  assertTypeEquality<ToBasePrimitiveType<bigint>, bigint>()
  assertTypeEquality<ToBasePrimitiveType<boolean>, boolean>()
  assertTypeEquality<ToBasePrimitiveType<symbol>, symbol>()
  assertTypeEquality<ToBasePrimitiveType<object>, object>()
  assertTypeEquality<ToBasePrimitiveType<never>, never>()
  assertTypeEquality<ToBasePrimitiveType<unknown>, unknown>()
  assertTypeEquality<ToBasePrimitiveType<any>, any>()

  assertTypeEquality<ToBasePrimitiveType<1 | 'a'>, number | string>()

  assertTypeEquality<ToBasePrimitiveType<{}>, {}>()
  assertTypeEquality<ToBasePrimitiveType<{ a: 1 }>, { a: 1 }>()
  assertTypeEquality<ToBasePrimitiveType<[]>, []>()
  assertTypeEquality<ToBasePrimitiveType<1[]>, 1[]>()
})

test('DiscriminatedUnion', () => {
  assertTypeEquality<
    DiscriminatedUnion<{ Rect: { width: number; height: number }; Circle: { radius: number } }>,
    { type: 'Rect'; width: number; height: number } | { type: 'Circle'; radius: number }
  >()
  assertTypeEquality<DiscriminatedUnion<{ Circle: [] }>, Simplify<{ type: 'Circle' } & []>>()
  assertTypeEquality<DiscriminatedUnion<{}>, never>()
  assertTypeEquality<
    DiscriminatedUnion<{ [Symbol.iterator]: { radius: number } }>,
    { type: typeof Symbol.iterator; radius: number }
  >()
})
