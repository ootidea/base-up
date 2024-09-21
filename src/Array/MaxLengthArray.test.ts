import { expect, test } from 'vitest'
import { isMaxLengthArray, isMaxLengthArrayDefer } from './MaxLengthArray'

test('isMaxLengthArray', () => {
  expect(isMaxLengthArray([], 0)).toBe(true)
  expect(isMaxLengthArray(['a'], 1)).toBe(true)
  expect(isMaxLengthArray(['a', 'b'], 1)).toBe(false)
})
test('isMaxLengthArrayDefer', () => {
  expect(isMaxLengthArrayDefer(0)([])).toBe(true)
  expect(isMaxLengthArrayDefer(1)(['a'])).toBe(true)
  expect(isMaxLengthArrayDefer(1)(['a', 'b'])).toBe(false)
})
