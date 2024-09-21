import { expect, test } from 'vitest'
import { isMinLengthArray, isMinLengthArrayDefer } from './MinLengthArray'

test('isMinLengthArray', () => {
  expect(isMinLengthArray([], 0)).toBe(true)
  expect(isMinLengthArray(['a'], 1)).toBe(true)
  expect(isMinLengthArray(['a'], 2)).toBe(false)
})
test('isMinLengthArrayDefer', () => {
  expect(isMinLengthArrayDefer(0)([])).toBe(true)
  expect(isMinLengthArrayDefer(1)(['a'])).toBe(true)
  expect(isMinLengthArrayDefer(2)(['a'])).toBe(false)
})
