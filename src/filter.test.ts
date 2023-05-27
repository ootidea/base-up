import { expect, test } from 'vitest'
import { elementAt, filter, indexesOf, LastOf, lastOf, modeBy, modeOf } from './filter'
import { rangeUntil, repeat } from './generate'
import { setOf } from './Set'
import { drop, dropLast, take } from './transform'
import { assertTypeEquality, isNotNull } from './type'

test('filter', () => {
  expect([...filter.Iterable([1, 2, 3], (n) => n % 2 === 0)]).toStrictEqual([2])

  expect(filter.Set(setOf(0, 1, 2), (x) => x > 0)).toStrictEqual(setOf(1, 2))
  expect(filter.Set(setOf(null, 1, 2), isNotNull)).toStrictEqual(setOf(1, 2))
})

test('lastOf', () => {
  expect(lastOf([1, 2, 3])).toBe(3)
  expect(lastOf([])).toBe(undefined)
})

test('LastOf', () => {
  assertTypeEquality<LastOf<[bigint]>, bigint>()
  assertTypeEquality<LastOf<[bigint, number]>, number>()
  assertTypeEquality<LastOf<[]>, undefined>()
  assertTypeEquality<LastOf<boolean[]>, boolean | undefined>()
  assertTypeEquality<LastOf<[string, ...string[]]>, string>()
  assertTypeEquality<LastOf<[boolean, ...string[]]>, boolean | string>()
  assertTypeEquality<LastOf<[Date] | [Date, boolean]>, Date | boolean>()
  assertTypeEquality<LastOf<[1?, 2?]>, 1 | 2 | undefined>()
  assertTypeEquality<LastOf<[0, 1, 2?, ...3[]]>, 1 | 2 | 3>()
})

test('take', () => {
  expect(take([1, 2, 3], 2)).toStrictEqual([1, 2])
  expect(take([1, 2, 3], 9)).toStrictEqual([1, 2, 3])
  expect(take([1, 2, 3], 0)).toStrictEqual([])
  expect(take(repeat.Iterable(true), 3)).toStrictEqual([true, true, true])
  expect(take(repeat.Iterable(true), 0)).toStrictEqual([])
})

test('drop', () => {
  expect(drop([1, 2, 3])).toStrictEqual([2, 3])
  expect(drop([1, 2, 3], -1 as number)).toStrictEqual([1, 2, 3])
  expect(drop([1, 2, 3], 0)).toStrictEqual([1, 2, 3])
  expect(drop([1, 2, 3], 1)).toStrictEqual([2, 3])
  expect(drop([1, 2, 3], 2)).toStrictEqual([3])
  expect(drop([1, 2, 3], 3)).toStrictEqual([])
  expect(drop([1, 2, 3], 4)).toStrictEqual([])
})

test('dropLast', () => {
  expect(dropLast([1, 2, 3])).toStrictEqual([1, 2])
  expect(dropLast([1, 2, 3], -1 as number)).toStrictEqual([1, 2, 3])
  expect(dropLast([1, 2, 3], 0)).toStrictEqual([1, 2, 3])
  expect(dropLast([1, 2, 3], 1)).toStrictEqual([1, 2])
  expect(dropLast([1, 2, 3], 2)).toStrictEqual([1])
  expect(dropLast([1, 2, 3], 3)).toStrictEqual([])
  expect(dropLast([1, 2, 3], 4)).toStrictEqual([])
})

test('indexesOf', () => {
  expect(indexesOf([true, false, true, true], true)).toStrictEqual([0, 2, 3])
  expect(indexesOf([], 123)).toStrictEqual([])
})

test('elementAt', () => {
  expect(elementAt(rangeUntil.Iterable(5), 0)).toBe(0)
  expect(elementAt(rangeUntil.Iterable(5), 3)).toBe(3)
  expect(elementAt(rangeUntil.Iterable(5), 5)).toBe(undefined)
})

test('modeOf', () => {
  expect(modeOf([3, 1, 4, 1, 5])).toBe(1)
  expect(modeOf(['a', 'b', 'c'])).toBe('a')
  expect(modeOf([])).toBe(undefined)
})

test('modeBy', () => {
  const first = { id: 1, name: 'first' }
  const second = { id: 2, name: 'second' }
  const third = { id: 3, name: 'third' }
  expect(modeBy([second, first, second, third], (element) => element.id)).toBe(second)
  expect(modeBy([first, second, third], (element) => element.id)).toBe(first)
  expect(modeBy([], (element) => element)).toBeUndefined()
})
