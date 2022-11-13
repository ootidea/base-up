import { intersection, isDisjoint, setOf, union } from './Set'
import { map } from './transform'

test('setOf', () => {
  expect(setOf(1, 2)).toStrictEqual(new Set([2, 1]))
})

test('map', () => {
  expect(map.Set(setOf(2, 1, 3), (x) => x + 10)).toStrictEqual(setOf(12, 11, 13))
})

test('union', () => {
  expect(union(setOf(1, 2, 3), setOf(3, 4, 5))).toStrictEqual(setOf(1, 2, 3, 4, 5))
})

test('intersection', () => {
  expect(intersection(setOf(1, 2, 3), setOf(2, 3, 4))).toStrictEqual(setOf(2, 3))
})

test('isDisjoint', () => {
  expect(isDisjoint(setOf(1, 2, 3), setOf(3, 4, 5))).toBe(false)
  expect(isDisjoint(setOf(1, 2, 3), setOf(4, 5))).toBe(true)
})
