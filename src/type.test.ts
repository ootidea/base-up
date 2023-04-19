import { expect, test } from 'vitest'
import { assertTypeEquality, IsEqual, isInstanceOf } from './type'

test('IsEqual', () => {
  assertTypeEquality<IsEqual<'abc', 'abc'>, true>()
  assertTypeEquality<IsEqual<1, number>, false>()

  assertTypeEquality<IsEqual<any, unknown>, false>()
  assertTypeEquality<IsEqual<any, never>, false>()
  assertTypeEquality<IsEqual<unknown, never>, false>()
  assertTypeEquality<IsEqual<void, undefined>, false>()

  assertTypeEquality<IsEqual<1 | 2, 2 | 1>, true>()
  assertTypeEquality<IsEqual<1 | never, 1>, true>()
  assertTypeEquality<IsEqual<1 | 1, 1>, true>()

  assertTypeEquality<IsEqual<{} & {}, {}>, true>()
  assertTypeEquality<IsEqual<Record<'a', number>, { a: number }>, true>()
})

test('isInstanceOf', () => {
  expect(isInstanceOf([], Array)).toBe(true)
  expect(isInstanceOf(/a/, RegExp)).toBe(true)
  expect(isInstanceOf('2021-09-27T15:08:10.78', Date)).toBe(false)
  expect(isInstanceOf({}, Object)).toBe(true)
})
