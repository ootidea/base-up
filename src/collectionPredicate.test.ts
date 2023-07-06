import { expect, expectTypeOf, test } from 'vitest'
import { every, isEmpty, isNotEmpty, isUnique } from './collectionPredicate'

test('isEmpty', () => {
  expect(isEmpty([1, 2, 3])).toBe(false)
  expect(isEmpty([])).toBe(true)

  expectTypeOf(isEmpty([1, 2, 3])).toEqualTypeOf<false>()
  expectTypeOf(isEmpty([])).toEqualTypeOf<true>()
  const array: number[] = []
  expectTypeOf(isEmpty(array)).toEqualTypeOf<boolean>()
})

test('isNotEmpty', () => {
  expect(isNotEmpty([1, 2, 3])).toBe(true)
  expect(isNotEmpty([])).toBe(false)
})

test('every', () => {
  expect(every([1, 2, 3], (x) => x > 0)).toBe(true)
  expect(every([1, 2, 3], (x) => x > 2)).toBe(false)
  expect(every([], () => false)).toBe(true)
})

test('isUnique', () => {
  expect(isUnique([1, 2, 3])).toBe(true)
  expect(isUnique([1, 2, 3, 1])).toBe(false)

  expect(isUnique([])).toBe(true)
  expectTypeOf(isUnique([])).toEqualTypeOf<true>()

  expect(isUnique('abc')).toBe(true)
  expect(isUnique('abca')).toBe(false)
})
