import { expect, test } from 'vitest'
import { isMaxLengthArray } from './MaxLengthArray'

test('isMaxLengthArray', () => {
  expect(isMaxLengthArray([], 0)).toBe(true)
  expect(isMaxLengthArray(['a'], 1)).toBe(true)
  expect(isMaxLengthArray(['a', 'b'], 1)).toBe(false)
})
test('isMaxLengthArray.defer', () => {
  expect(isMaxLengthArray.defer(0)([])).toBe(true)
  expect(isMaxLengthArray.defer(1)(['a'])).toBe(true)
  expect(isMaxLengthArray.defer(1)(['a', 'b'])).toBe(false)
})
