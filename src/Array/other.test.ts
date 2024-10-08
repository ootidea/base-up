import { expect, expectTypeOf, test } from 'vitest'
import { setOf } from '../Set'
import { assertTypeEquality } from '../type'
import { type DestructTuple, type IsTuple, type MinLengthOf, type UnionToTuple, shuffle } from './other'

test('shuffle', () => {
  expect(setOf(...shuffle([1, 2, 3]))).toStrictEqual(setOf(1, 2, 3))
  expect(shuffle([1, 2, 3]).length).toEqual(3)
  expect(shuffle([])).toStrictEqual([])
  expect(shuffle(['one'])).toStrictEqual(['one'])

  expectTypeOf(shuffle([1, 2, 3])).toEqualTypeOf<[1 | 2 | 3, 1 | 2 | 3, 1 | 2 | 3]>()
  expectTypeOf(shuffle([])).toEqualTypeOf<[]>()
  expectTypeOf(shuffle(['one'])).toEqualTypeOf<['one']>()
})

test('UnionToTuple', () => {
  assertTypeEquality<UnionToTuple<1 | 2> extends [1, 2] | [2, 1] ? true : false, true>()
  assertTypeEquality<UnionToTuple<boolean> extends [false, true] | [true, false] ? true : false, true>()
  assertTypeEquality<UnionToTuple<never>, []>()
  assertTypeEquality<UnionToTuple<any>, [any]>()
  assertTypeEquality<UnionToTuple<unknown>, [unknown]>()
})

test('IsTuple', () => {
  assertTypeEquality<IsTuple<[]>, true>()
  assertTypeEquality<IsTuple<[1, 2, 3]>, true>()
  assertTypeEquality<IsTuple<[1, ...0[]]>, true>()
  assertTypeEquality<IsTuple<[...0[], 1]>, true>()
  assertTypeEquality<IsTuple<[1, 2?, 3?]>, true>()
  assertTypeEquality<IsTuple<[1, 2?, ...3[]]>, true>()
  assertTypeEquality<IsTuple<[1?, ...any]>, true>()

  assertTypeEquality<IsTuple<number[]>, false>()
  assertTypeEquality<IsTuple<readonly any[]>, false>()
  assertTypeEquality<IsTuple<any>, false>()

  assertTypeEquality<IsTuple<never>, never>()
  assertTypeEquality<IsTuple<[] | any[]>, true | false>()
})

test('MinLengthOf', () => {
  assertTypeEquality<MinLengthOf<[]>, 0>()
  assertTypeEquality<MinLengthOf<[string]>, 1>()
  assertTypeEquality<MinLengthOf<[string, number]>, 2>()
  assertTypeEquality<MinLengthOf<[string, ...number[]]>, 1>()
  assertTypeEquality<MinLengthOf<[...number[], string]>, 1>()
  assertTypeEquality<MinLengthOf<[string, ...number[], string]>, 2>()
  assertTypeEquality<MinLengthOf<[string, number?, string?]>, 1>()
  assertTypeEquality<MinLengthOf<[string, number?, ...string[]]>, 1>()

  assertTypeEquality<MinLengthOf<[] | [string]>, 0 | 1>()
  assertTypeEquality<MinLengthOf<any[]>, 0>()
  assertTypeEquality<MinLengthOf<readonly 1[]>, 0>()
  assertTypeEquality<MinLengthOf<any>, 0>()
  assertTypeEquality<MinLengthOf<never>, never>()
})

test('DestructTuple', () => {
  assertTypeEquality<DestructTuple<[1, ...2[], 3]>, { leading: [1]; optional: []; rest: 2[]; trailing: [3] }>()
  assertTypeEquality<DestructTuple<[...1[], 2, 3]>, { leading: []; optional: []; rest: 1[]; trailing: [2, 3] }>()
  assertTypeEquality<DestructTuple<[1, 2?, ...3[]]>, { leading: [1]; optional: [2]; rest: 3[]; trailing: [] }>()
  assertTypeEquality<DestructTuple<string[]>, { leading: []; optional: []; rest: string[]; trailing: [] }>()
  assertTypeEquality<DestructTuple<any>, { leading: []; optional: []; rest: any[]; trailing: [] }>()
  assertTypeEquality<DestructTuple<[1, ...any]>, { leading: [1]; optional: []; rest: any[]; trailing: [] }>()
  assertTypeEquality<DestructTuple<never>, never>()
})
