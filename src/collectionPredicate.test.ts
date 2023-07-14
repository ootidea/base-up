import { expect, expectTypeOf, test } from 'vitest'
import { every, includes, isEmpty, isNotEmpty, isUnique } from './collectionPredicate'

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

test('includes', () => {
  expect(includes([1, 2, 3], 1)).toBe(true)
  expect(includes([1, 2, 3], 'a')).toBe(false)
  expect(includes([1, 2, 3], 1, 4)).toBe(false)

  expect(includes([], 0n)).toBe(false)
  expectTypeOf(includes([], 0n)).toEqualTypeOf<false>()
})

test('includes.defer', () => {
  expect(includes.defer(1)([1, 2, 3])).toBe(true)
  expect(includes.defer('a')([1, 2, 3])).toBe(false)
  expect(includes.defer(1, 4)([1, 2, 3])).toBe(false)

  expect(includes.defer(0n)([])).toBe(false)
  expectTypeOf(includes.defer(0n)([])).toEqualTypeOf<false>()
})

test('includes.Iterable', () => {
  expect(includes.Iterable([1, 2, 3], 1)).toBe(true)
  expect(includes.Iterable([1, 2, 3], 'a')).toBe(false)
  expect(includes.Iterable('abc', 'a')).toBe(true)
})

test('includes.Iterable.defer', () => {
  expect(includes.Iterable.defer(1)([1, 2, 3])).toBe(true)
  expect(includes.Iterable.defer('a')([1, 2, 3])).toBe(false)
  expect(includes.Iterable.defer('a')('abc')).toBe(true)
})

test('includes.string', () => {
  expect(includes.string('abc', 'a')).toBe(true)
  expect(includes.string('abc', 'A')).toBe(false)

  expect(includes.string('a', '')).toBe(true)
  expectTypeOf(includes.string('a', '')).toEqualTypeOf<true>()
  expect(includes.string('', '')).toBe(true)
  expectTypeOf(includes.string('', '')).toEqualTypeOf<true>()
  expect(includes.string('', 'a')).toBe(false)
  expectTypeOf(includes.string('', 'a')).toEqualTypeOf<false>()
})

test('includes.string.defer', () => {
  expect(includes.string.defer('a')('abc')).toBe(true)
  expect(includes.string.defer('A')('abc')).toBe(false)

  expect(includes.string.defer('')('a')).toBe(true)
  expectTypeOf(includes.string.defer('')('a')).toEqualTypeOf<true>()
  expect(includes.string.defer('')('')).toBe(true)
  expectTypeOf(includes.string.defer('')('')).toEqualTypeOf<true>()
  expect(includes.string.defer('a')('')).toBe(false)
  expectTypeOf(includes.string.defer('a')('')).toEqualTypeOf<false>()
})

test('isUnique', () => {
  expect(isUnique([1, 2, 3])).toBe(true)
  expect(isUnique([1, 2, 3, 1])).toBe(false)

  expect(isUnique([])).toBe(true)
  expectTypeOf(isUnique([])).toEqualTypeOf<true>()
  expect(isUnique('')).toBe(true)
  expectTypeOf(isUnique('')).toEqualTypeOf<true>()

  expect(isUnique('abc')).toBe(true)
  expect(isUnique('abca')).toBe(false)
})
