import { expect, test } from 'vitest'
import { isLexicographicAtMost, isLexicographicLessThan } from './comparison'

test('isLexicographicLessThan', () => {
  expect(isLexicographicLessThan([1, 2, 3], [1, 8, 0])).toStrictEqual(true)
  expect(isLexicographicLessThan([1, 2, 3], [1, 2, 3])).toStrictEqual(false)
  expect(isLexicographicLessThan([1, 2, 3], [1, 2, 3, 4])).toStrictEqual(true)
  expect(isLexicographicLessThan([1, 2, 3], [1, 2])).toStrictEqual(false)
  expect(isLexicographicLessThan([1, 2, 3], [5, 7])).toStrictEqual(true)
  expect(isLexicographicLessThan([1, 2, 3], [0, 7])).toStrictEqual(false)
  expect(isLexicographicLessThan([10], [3])).toStrictEqual(false)
  expect(isLexicographicLessThan(['alice'], ['bob'])).toStrictEqual(true)
  expect(isLexicographicLessThan([], [])).toStrictEqual(false)
})

test('isLexicographicAtMost', () => {
  expect(isLexicographicAtMost([1, 2, 3], [1, 8, 0])).toStrictEqual(true)
  expect(isLexicographicAtMost([1, 2, 3], [1, 2, 3])).toStrictEqual(true)
  expect(isLexicographicAtMost([1, 2, 3], [1, 2, 3, 4])).toStrictEqual(true)
  expect(isLexicographicAtMost([1, 2, 3], [5, 7])).toStrictEqual(true)
  expect(isLexicographicAtMost([1, 2, 3], [0, 7])).toStrictEqual(false)
  expect(isLexicographicAtMost([10], [3])).toStrictEqual(false)
  expect(isLexicographicAtMost(['alice'], ['bob'])).toStrictEqual(true)
  expect(isLexicographicAtMost([], [])).toStrictEqual(true)
})
