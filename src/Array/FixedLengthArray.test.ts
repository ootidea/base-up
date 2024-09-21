import { expect, test } from 'vitest'
import { assertTypeEquality } from '../type'
import { FixedLengthArray, isFixedLengthArray, isFixedLengthArrayDefer } from './FixedLengthArray'

test('FixedLengthArray', () => {
  assertTypeEquality<FixedLengthArray<1>, [unknown]>()
  assertTypeEquality<FixedLengthArray<2, boolean>, [boolean, boolean]>()
  assertTypeEquality<FixedLengthArray<0>, []>()

  assertTypeEquality<FixedLengthArray<0 | 2, any>, [] | [any, any]>()
  assertTypeEquality<FixedLengthArray<number>, unknown[]>()
  assertTypeEquality<FixedLengthArray<any>, unknown[]>()
  assertTypeEquality<FixedLengthArray<never>, never>()
})

test('isFixedLengthArray', () => {
  expect(isFixedLengthArray([], 0)).toBe(true)
  expect(isFixedLengthArray(['a'], 1)).toBe(true)
  expect(isFixedLengthArray(['a'], 2)).toBe(false)
})
test('isFixedLengthArrayDefer', () => {
  expect(isFixedLengthArrayDefer(0)([])).toBe(true)
  expect(isFixedLengthArrayDefer(1)(['a'])).toBe(true)
  expect(isFixedLengthArrayDefer(2)(['a'])).toBe(false)
})
