import { expect, test } from 'vitest'
import { isMinLengthArray } from './MinLengthArray'

test('isMinLengthArray', () => {
  expect(isMinLengthArray([], 0)).toBe(true)
  expect(isMinLengthArray(['a'], 1)).toBe(true)
  expect(isMinLengthArray(['a'], 2)).toBe(false)
})
test('isMinLengthArray.defer', () => {
  expect(isMinLengthArray.defer(0)([])).toBe(true)
  expect(isMinLengthArray.defer(1)(['a'])).toBe(true)
  expect(isMinLengthArray.defer(2)(['a'])).toBe(false)
})
