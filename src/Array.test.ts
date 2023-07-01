import { expect, expectTypeOf, test } from 'vitest'
import { shuffle, UnionToTuple } from './Array'
import { setOf } from './Set'
import { assertTypeEquality } from './type'

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
  assertTypeEquality<UnionToTuple<1 | 2>, [1, 2]>()
  assertTypeEquality<UnionToTuple<string | boolean>, [string, false, true]>()
  assertTypeEquality<UnionToTuple<never>, []>()
  assertTypeEquality<UnionToTuple<any>, [any]>()
  assertTypeEquality<UnionToTuple<unknown>, [unknown]>()
})
