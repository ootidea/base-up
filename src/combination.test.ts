import { expect, test } from 'vitest'
import {
  cartesianProductOf,
  createNGrams,
  permutationOf,
  permutationOfNumber,
  prefixesOf,
  PrefixesOf,
} from './combination'
import { assertTypeEquality } from './type'

test('cartesianProductOf', () => {
  expect(cartesianProductOf([0, 1], ['a', 'b'])).toStrictEqual([
    [0, 'a'],
    [0, 'b'],
    [1, 'a'],
    [1, 'b'],
  ])
  expect(cartesianProductOf([0, 1], [])).toStrictEqual([])
  expect(cartesianProductOf([], ['a', 'b'])).toStrictEqual([])
  expect(cartesianProductOf([0, 1], ['a'])).toStrictEqual([
    [0, 'a'],
    [1, 'a'],
  ])
})

test('permutationOf', () => {
  expect(permutationOf([1])).toStrictEqual([[1]])
  expect(permutationOf([1, 2])).toStrictEqual([
    [1, 2],
    [2, 1],
  ])
  expect(permutationOf([1, 2, 3])).toStrictEqual([
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ])
  expect(permutationOf([1, 2, 3], 2)).toStrictEqual([
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 1],
    [3, 2],
  ])
  expect(permutationOf([])).toStrictEqual([[]])
  expect(permutationOf([1], 5)).toStrictEqual([[1]])
  expect(permutationOf([1, 2], -5)).toStrictEqual([[]])

  expect(permutationOfNumber(3, 1)).toBe(3)
  expect(permutationOfNumber(3, 3)).toBe(6)
  expect(permutationOfNumber(5, 2)).toBe(20)
})

test('createNGrams', () => {
  expect(createNGrams([1, 2, 3], 2)).toStrictEqual([
    [1, 2],
    [2, 3],
  ])
  expect(createNGrams([1, 2, 3], 3)).toStrictEqual([[1, 2, 3]])
  expect(createNGrams([1, 2, 3], 1)).toStrictEqual([[1], [2], [3]])
  expect(createNGrams([1, 2, 3], 0)).toStrictEqual([[], [], [], []])
  expect(createNGrams([1, 2, 3], 4)).toStrictEqual([])
  expect(createNGrams([], 0)).toStrictEqual([[]])
})

test('PrefixesOf', () => {
  assertTypeEquality<PrefixesOf<[1, 2, 3]>, [[], [1], [1, 2], [1, 2, 3]]>()
  // assertTypeEquality<PrefixesOf<[1, ...2[]]>, [[], [1], ...[1, ...2[]][]]>()
  assertTypeEquality<PrefixesOf<string[]>, string[][]>()
})

test('prefixesOf', () => {
  expect(prefixesOf([1, 2, 3])).toStrictEqual([[], [1], [1, 2], [1, 2, 3]])
  expect(prefixesOf([])).toStrictEqual([[]])
})
