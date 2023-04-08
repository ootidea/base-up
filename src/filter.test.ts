import { elementAt, filter, indexesOf, lastOf, modeBy, modeOf } from './filter'
import { rangeTo, repeat } from './generate'
import { setOf } from './Set'
import { drop, take } from './transform'
import { isNotNull } from './type'

test('filter', () => {
  expect([...filter.Iterable([1, 2, 3], (n) => n % 2 === 0)]).toStrictEqual([2])

  expect(filter.Set(setOf(0, 1, 2), (x) => x > 0)).toStrictEqual(setOf(1, 2))
  expect(filter.Set(setOf(null, 1, 2), isNotNull)).toStrictEqual(setOf(1, 2))
})

test('last', () => {
  expect(lastOf([1, 2, 3])).toBe(3)
  expect(lastOf([])).toBe(undefined)
})

test('take', () => {
  expect(take([1, 2, 3], 2)).toStrictEqual([1, 2])
  expect(take([1, 2, 3], 9)).toStrictEqual([1, 2, 3])
  expect(take([1, 2, 3], 0)).toStrictEqual([])
  expect(take(repeat.Iterable(true), 3)).toStrictEqual([true, true, true])
  expect(take(repeat.Iterable(true), 0)).toStrictEqual([])
})

test('drop', () => {
  expect(drop([1, 2, 3], 0)).toStrictEqual([1, 2, 3])
  expect(drop([1, 2, 3], 1)).toStrictEqual([2, 3])
  expect(drop([1, 2, 3], 3)).toStrictEqual([])
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
