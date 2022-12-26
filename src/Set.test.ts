import { intersectionOf, isDisjoint, isSubset, setOf, unionOf } from './Set'

test('setOf', () => {
  expect(setOf(1, 2)).toStrictEqual(new Set([2, 1]))
})

test('union', () => {
  expect(unionOf(setOf(1, 2, 3), setOf(3, 4, 5))).toStrictEqual(setOf(1, 2, 3, 4, 5))
})

test('intersection', () => {
  expect(intersectionOf(setOf(1, 2, 3), setOf(2, 3, 4))).toStrictEqual(setOf(2, 3))
})

test('isDisjoint', () => {
  expect(isDisjoint(setOf(1, 2, 3), setOf(3, 4, 5))).toBe(false)
  expect(isDisjoint(setOf(1, 2, 3), setOf(4, 5))).toBe(true)
})

test('isSubset', () => {
  expect(isSubset(setOf(1, 2), setOf(1, 2, 3))).toBe(true)
  expect(isSubset(setOf(1, 2), setOf(1, 2))).toBe(true)
  expect(isSubset(setOf(1, 2, 3), setOf(1, 2))).toBe(false)
  expect(isSubset(setOf(1, 2, 3), setOf(3, 4, 5))).toBe(false)
})
