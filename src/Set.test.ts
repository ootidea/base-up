import { expect, expectTypeOf, test } from 'vitest'
import {
  differenceOf,
  intersectionOf,
  isDisjoint,
  isSubsetOf,
  setMembership,
  setOf,
  toggleMembership,
  unionOf,
} from './Set'

test('setOf', () => {
  expect(setOf(1, 2)).toStrictEqual(new Set([1, 2]))
  expect(setOf()).toStrictEqual(new Set())

  expectTypeOf(setOf(1, 2)).toEqualTypeOf<Set<number>>()
  expectTypeOf(setOf()).toEqualTypeOf<Set<never>>()
})

test('toggleMembership', () => {
  expect(toggleMembership(setOf(1, 2, 3), 2)).toStrictEqual(setOf(1, 3))
  expect(toggleMembership(setOf(1, 2, 3), 9)).toStrictEqual(setOf(1, 2, 3, 9))
  expect(toggleMembership(setOf(1, 2, 3), null)).toStrictEqual(setOf(1, 2, 3, null))
})
test('toggleMembership.mutable', () => {
  const set = setOf(1, 2, 3)
  toggleMembership.mutable(set, 2)
  expect(set).toStrictEqual(setOf(1, 3))
  toggleMembership.mutable(set, 4)
  expect(set).toStrictEqual(setOf(1, 3, 4))
})

test('setMembership', () => {
  expect(setMembership(setOf(1, 2, 3), 2, false)).toStrictEqual(setOf(1, 3))
  expect(setMembership(setOf(1, 2, 3), 2, true)).toStrictEqual(setOf(1, 2, 3))
  expect(setMembership(setOf(1, 2, 3), null, false)).toStrictEqual(setOf(1, 2, 3))
  expect(setMembership(setOf(1, 2, 3), null, true)).toStrictEqual(setOf(1, 2, 3, null))
})
test('setMembership.mutable', () => {
  const set = new Set([1, 2, 3])
  setMembership.mutable(set, 2, false)
  expect(set).toStrictEqual(setOf(1, 3))
  setMembership.mutable(set, null, true)
  expect(set).toStrictEqual(setOf(1, 3, null))
  setMembership.mutable(set, null, true)
  expect(set).toStrictEqual(setOf(1, 3, null))
  setMembership.mutable(set, 9, false)
  expect(set).toStrictEqual(setOf(1, 3, null))
})

test('unionOf', () => {
  expect(unionOf(setOf(1, 2, 3), setOf(3, 4, 5))).toStrictEqual(setOf(1, 2, 3, 4, 5))
})

test('intersectionOf', () => {
  expect(intersectionOf(setOf(1, 2, 3), setOf(2, 3, 4))).toStrictEqual(setOf(2, 3))
})

test('differenceOf', () => {
  expect(differenceOf(setOf(1, 2, 3), setOf(2, 3, 4))).toStrictEqual(setOf(1))
})

test('isDisjoint', () => {
  expect(isDisjoint(setOf(1, 2, 3), setOf(3, 4, 5))).toBe(false)
  expect(isDisjoint(setOf(1, 2, 3), setOf(4, 5))).toBe(true)
})

test('isSubsetOf', () => {
  expect(isSubsetOf(setOf(1, 2), setOf(1, 2, 3))).toBe(true)
  expect(isSubsetOf(setOf(1, 2), setOf(1, 2))).toBe(true)
  expect(isSubsetOf(setOf(1, 2, 3), setOf(1, 2))).toBe(false)
  expect(isSubsetOf(setOf(1, 2, 3), setOf(3, 4, 5))).toBe(false)
})
