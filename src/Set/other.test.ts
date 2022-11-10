import { isNotNull } from '../other'
import { filter, intersection, map, setOf, union } from './other'

test('setOf', () => {
  expect(setOf(1, 2)).toStrictEqual(new Set([2, 1]))
})

test('map', () => {
  expect(map(setOf(2, 1, 3), (x) => x + 10)).toStrictEqual(setOf(12, 11, 13))
})

test('filter', () => {
  expect(filter(setOf(0, 1, 2), (x) => x > 0)).toStrictEqual(setOf(1, 2))
  expect(filter(setOf(null, 1, 2), isNotNull)).toStrictEqual(setOf(1, 2))
})

test('union', () => {
  expect(union(setOf(1, 2, 3), setOf(3, 4, 5))).toStrictEqual(setOf(1, 2, 3, 4, 5))
})

test('intersection', () => {
  expect(intersection(setOf(1, 2, 3), setOf(2, 3, 4))).toStrictEqual(setOf(2, 3))
})
