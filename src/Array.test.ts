import { expect, expectTypeOf, test } from 'vitest'
import { FixedLengthArray, shuffle } from './Array'
import { setOf } from './Set'
import { assertTypeEquality } from './type'

test('FixedLengthArray', () => {
  assertTypeEquality<FixedLengthArray<1>, [unknown]>()
  assertTypeEquality<FixedLengthArray<2, boolean>, [boolean, boolean]>()
  assertTypeEquality<FixedLengthArray<0>, []>()

  assertTypeEquality<FixedLengthArray<0 | 2, any>, [] | [any, any]>()
  assertTypeEquality<FixedLengthArray<number>, unknown[]>()
})

test('shuffle', () => {
  expect(setOf(...shuffle([1, 2, 3]))).toStrictEqual(setOf(1, 2, 3))
  expect(shuffle([1, 2, 3]).length).toEqual(3)
  expect(shuffle([])).toStrictEqual([])
  expect(shuffle(['one'])).toStrictEqual(['one'])

  expectTypeOf(shuffle([1, 2, 3])).toEqualTypeOf<[1 | 2 | 3, 1 | 2 | 3, 1 | 2 | 3]>()
  expectTypeOf(shuffle([])).toEqualTypeOf<[]>()
  expectTypeOf(shuffle(['one'])).toEqualTypeOf<['one']>()
})
