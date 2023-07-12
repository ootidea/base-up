import { expect, test } from 'vitest'
import { rangeUntil } from './generate'
import { mapOf } from './Map'
import { groupBy, sumOf, toMultiset } from './other'

test('groupBy', () => {
  expect(groupBy(rangeUntil(8), (x) => x % 3)).toStrictEqual({ 0: [0, 3, 6], 1: [1, 4, 7], 2: [2, 5] })
})
test('groupBy.Map', () => {
  expect(groupBy.Map(rangeUntil(8), (x) => x % 3)).toStrictEqual(mapOf([0, [0, 3, 6]], [1, [1, 4, 7]], [2, [2, 5]]))
})

test('toMultiset', () => {
  expect(toMultiset(['a', 'a', 'b', 'c'])).toStrictEqual(mapOf(['a', 2], ['b', 1], ['c', 1]))
  expect(toMultiset([null, undefined, null])).toStrictEqual(mapOf([null, 2], [undefined, 1]))
  expect(toMultiset('Hello')).toStrictEqual(mapOf(['H', 1], ['e', 1], ['l', 2], ['o', 1]))
})

test('sumOf', () => {
  expect(sumOf([1, 2, 3])).toBe(6)
  expect(sumOf([])).toBe(0)
})
