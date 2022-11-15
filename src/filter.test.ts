import { elementAt, filter, findMode, indexesOf, last } from './filter'
import { rangeTo, repeat } from './generate'
import { setOf } from './Set'
import { take } from './transform'
import { isNotNull } from './type'

test('filter', () => {
  expect([...filter.Iterable([1, 2, 3], (n) => n % 2 === 0)]).toStrictEqual([2])

  expect(filter.Set(setOf(0, 1, 2), (x) => x > 0)).toStrictEqual(setOf(1, 2))
  expect(filter.Set(setOf(null, 1, 2), isNotNull)).toStrictEqual(setOf(1, 2))
})

test('last', () => {
  expect(last([1, 2, 3])).toBe(3)
  expect(last([])).toBe(undefined)
})

test('take', () => {
  expect(take([1, 2, 3], 2)).toStrictEqual([1, 2])
  expect(take([1, 2, 3], 9)).toStrictEqual([1, 2, 3])
  expect(take([1, 2, 3], 0)).toStrictEqual([])
  expect(take(repeat.Iterable(true), 3)).toStrictEqual([true, true, true])
  expect(take(repeat.Iterable(true), 0)).toStrictEqual([])
})

test('indexesOf', () => {
  expect(indexesOf([true, false, true, true], true)).toStrictEqual([0, 2, 3])
  expect(indexesOf([], 123)).toStrictEqual([])
})

test('elementAt', () => {
  expect(elementAt(rangeTo.Iterable(5), 0)).toBe(0)
  expect(elementAt(rangeTo.Iterable(5), 3)).toBe(3)
  expect(elementAt(rangeTo.Iterable(5), 5)).toBe(undefined)
})

test('findMode', () => {
  expect(findMode([3, 1, 4, 1, 5])).toBe(1)
  expect(findMode(['a', 'b', 'c'])).toBe('a')
  expect(findMode([])).toBe(undefined)
})
