import { expect, test } from 'vitest'
import { type Repeat, assertTypeEquality, take } from './all'
import { every, isUnique } from './collectionPredicate'
import {
  fromEntries,
  repeat,
  repeatApply,
  repeatApplyIterable,
  repeatIterable,
  sequentialNumbersThrough,
  sequentialNumbersUntil,
  sequentialNumbersUntilIterable,
  uniqueRandomIntegersUntil,
} from './generate'

test('sequentialNumbersUntil', () => {
  expect(sequentialNumbersUntil(3)).toStrictEqual([0, 1, 2])
  expect(sequentialNumbersUntil(-3)).toStrictEqual([0, -1, -2])
  expect(sequentialNumbersUntil(0)).toStrictEqual([])
  expect(sequentialNumbersUntil(2, 5)).toStrictEqual([2, 3, 4])
  expect(sequentialNumbersUntil(2, -2)).toStrictEqual([2, 1, 0, -1])
  expect(sequentialNumbersUntil(-2, 2)).toStrictEqual([-2, -1, 0, 1])
  expect(sequentialNumbersUntil(-2, -5)).toStrictEqual([-2, -3, -4])
  expect(sequentialNumbersUntil(3, 3)).toStrictEqual([])

  expect([...sequentialNumbersUntilIterable(5)]).toStrictEqual([0, 1, 2, 3, 4])
})

test('sequentialNumbersThrough', () => {
  expect(sequentialNumbersThrough(3)).toStrictEqual([0, 1, 2, 3])
  expect(sequentialNumbersThrough(-3)).toStrictEqual([0, -1, -2, -3])
  expect(sequentialNumbersThrough(0)).toStrictEqual([0])
  expect(sequentialNumbersThrough(2, 5)).toStrictEqual([2, 3, 4, 5])
  expect(sequentialNumbersThrough(2, -2)).toStrictEqual([2, 1, 0, -1, -2])
  expect(sequentialNumbersThrough(-2, 2)).toStrictEqual([-2, -1, 0, 1, 2])
  expect(sequentialNumbersThrough(-2, -5)).toStrictEqual([-2, -3, -4, -5])
  expect(sequentialNumbersThrough(3, 3)).toStrictEqual([3])
})

test('uniqueRandomIntegersUntil', () => {
  expect(uniqueRandomIntegersUntil(5, 3).length).toBe(3)
  expect(every(uniqueRandomIntegersUntil(5, 3), (x) => 0 <= x && x < 5)).toBe(true)
  expect(isUnique(uniqueRandomIntegersUntil(5, 3))).toBe(true)
  expect(uniqueRandomIntegersUntil(1, 1)).toStrictEqual([0])
})

test('Repeat', () => {
  assertTypeEquality<Repeat<2, [string]>, [string, string]>()
  assertTypeEquality<Repeat<2, [1, 2]>, [1, 2, 1, 2]>()
  assertTypeEquality<Repeat<0, [Date]>, []>()
  assertTypeEquality<Repeat<3, []>, []>()
  assertTypeEquality<Repeat<1 | 2, ['abc']>, ['abc'] | ['abc', 'abc']>()
  assertTypeEquality<Repeat<never, [1, 2]>, never>()
  assertTypeEquality<Repeat<number, [1, 2]>, (1 | 2)[]>()
  assertTypeEquality<Repeat<any, [1, 2]>, (1 | 2)[]>()
})

test('repeat', () => {
  expect(repeat(3, true)).toStrictEqual([true, true, true])
  expect(repeat(2, 0.5, 'done')).toStrictEqual([0.5, 'done', 0.5, 'done'])
  expect(repeat(1, 123)).toStrictEqual([123])
  expect(repeat(0, 123)).toStrictEqual([])
})

test('repeatIterable', () => {
  expect(take(repeatIterable(true), 5)).toStrictEqual([true, true, true, true, true])
  expect(take(repeatIterable(0, 9), 4)).toStrictEqual([0, 9, 0, 9])
})

test('repeatApply', () => {
  expect(repeatApply(4, -5, (x) => x * -2)).toStrictEqual([-5, 10, -20, 40])
  expect(repeatApply(3, 'title', (text) => 're: ' + text)).toStrictEqual(['title', 're: title', 're: re: title'])
  expect(repeatApply(0, '123', (x) => x + 1)).toStrictEqual([])
})

test('repeatApplyIterable', () => {
  expect(
    take(
      repeatApplyIterable(0, (x) => x + 3),
      5,
    ),
  ).toStrictEqual([0, 3, 6, 9, 12])
})

test('fromEntries', () => {
  const entries = [
    ['abc', 1],
    ['def', 2],
    [0, 3],
  ] as const
  const object = fromEntries(entries)

  expect(object.abc).toBe(1)
  expect(object.def).toBe(2)
  expect(object[0]).toBe(3)
})
