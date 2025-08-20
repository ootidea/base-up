import { expect, expectTypeOf, test } from 'vitest'
import { mapOf, setOf } from './all'
import {
  every,
  everyIterable,
  includes,
  includesDefer,
  includesIterable,
  includesIterableDefer,
  includesString,
  includesStringDefer,
  isEmpty,
  isNotEmpty,
  isUnique,
  some,
  someIterable,
} from './collectionPredicate'

test('isEmpty', () => {
  expect(isEmpty([1, 2, 3])).toBe(false)
  expect(isEmpty([])).toBe(true)
  expect(isEmpty(setOf(1, 2, 3))).toBe(false)
  expect(isEmpty(setOf())).toBe(true)
  expect(isEmpty(mapOf([false, 0], [true, 1]))).toBe(false)
  expect(isEmpty(mapOf())).toBe(true)
  expect(isEmpty('abc')).toBe(false)
  expect(isEmpty('')).toBe(true)

  expectTypeOf(isEmpty([1, 2, 3])).toEqualTypeOf<false>()
  expectTypeOf(isEmpty([])).toEqualTypeOf<true>()
  const array: number[] = []
  expectTypeOf(isEmpty(array)).toEqualTypeOf<boolean>()
})

test('isNotEmpty', () => {
  expect(isNotEmpty([1, 2, 3])).toBe(true)
  expect(isNotEmpty([])).toBe(false)
  expect(isNotEmpty(setOf(1, 2, 3))).toBe(true)
  expect(isNotEmpty(setOf())).toBe(false)
  expect(isNotEmpty(mapOf([false, 0], [true, 1]))).toBe(true)
  expect(isNotEmpty(mapOf())).toBe(false)
  expect(isNotEmpty('abc')).toBe(true)
  expect(isNotEmpty('')).toBe(false)
})

test('every', () => {
  expect(every([1, 2, 3], (x) => x > 0)).toBe(true)
  expect(every([1, 2, 3], (x) => x > 2)).toBe(false)
  expect(every([], () => false)).toBe(true)
})

test('some', () => {
  expect(some([1, 2, 3], (x) => x > 2)).toBe(true)
  expect(some([1, 2, 3], (x) => x > 3)).toBe(false)
  expect(some([], () => false)).toBe(false)
})

test('everyIterable', () => {
  expect(everyIterable([1, 2, 3], (x) => x > 0)).toBe(true)
  expect(everyIterable([1, 2, 3], (x) => x > 2)).toBe(false)
  expect(everyIterable([], () => false)).toBe(true)
})

test('someIterable', () => {
  expect(someIterable([1, 2, 3], (x) => x > 2)).toBe(true)
  expect(someIterable([1, 2, 3], (x) => x > 3)).toBe(false)
  expect(someIterable([], () => false)).toBe(false)
})

test('includes', () => {
  expect(includes([1, 2, 3], 1)).toBe(true)
  expect(includes([1, 2, 3], 'a')).toBe(false)
  expect(includes([1, 2, 3], 1, 4)).toBe(false)

  expect(includes([], 0n)).toBe(false)
  expectTypeOf(includes([], 0n)).toEqualTypeOf<false>()
})

test('includesDefer', () => {
  expect(includesDefer(1)([1, 2, 3])).toBe(true)
  expect(includesDefer('a')([1, 2, 3])).toBe(false)
  expect(includesDefer(1, 4)([1, 2, 3])).toBe(false)

  expect(includesDefer(0n)([])).toBe(false)
  expectTypeOf(includesDefer(0n)([])).toEqualTypeOf<false>()
})

test('includesIterable', () => {
  expect(includesIterable([1, 2, 3], 1)).toBe(true)
  expect(includesIterable([1, 2, 3], 'a')).toBe(false)
  expect(includesIterable('abc', 'a')).toBe(true)
})

test('includesIterableDefer', () => {
  expect(includesIterableDefer(1)([1, 2, 3])).toBe(true)
  expect(includesIterableDefer('a')([1, 2, 3])).toBe(false)
  expect(includesIterableDefer('a')('abc')).toBe(true)
})

test('includesString', () => {
  expect(includesString('abc', 'a')).toBe(true)
  expect(includesString('abc', 'A')).toBe(false)

  expect(includesString('a', '')).toBe(true)
  expectTypeOf(includesString('a', '')).toEqualTypeOf<true>()
  expect(includesString('', '')).toBe(true)
  expectTypeOf(includesString('', '')).toEqualTypeOf<true>()
  expect(includesString('', 'a')).toBe(false)
  expectTypeOf(includesString('', 'a')).toEqualTypeOf<false>()
})

test('includesStringDefer', () => {
  expect(includesStringDefer('a')('abc')).toBe(true)
  expect(includesStringDefer('A')('abc')).toBe(false)

  expect(includesStringDefer('')('a')).toBe(true)
  expectTypeOf(includesStringDefer('')('a')).toEqualTypeOf<true>()
  expect(includesStringDefer('')('')).toBe(true)
  expectTypeOf(includesStringDefer('')('')).toEqualTypeOf<true>()
  expect(includesStringDefer('a')('')).toBe(false)
  expectTypeOf(includesStringDefer('a')('')).toEqualTypeOf<false>()
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
