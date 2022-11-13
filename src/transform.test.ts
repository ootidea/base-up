import { shuffle } from './Array'
import { id } from './Function'
import { repeat, until } from './generate'
import { elementAt } from './Iterable'
import { setOf } from './Set'
import { chunk, sort, sortBy, zip } from './transform'

test('elementAt', () => {
  expect(elementAt(until.Iterable(5), 0)).toBe(0)
  expect(elementAt(until.Iterable(5), 3)).toBe(3)
  expect(elementAt(until.Iterable(5), 5)).toBe(undefined)
})

test('chunk', () => {
  expect(chunk([1, 2, 3, 4, 5, 6], 2)).toStrictEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
  expect(chunk([3, 1, 4, 1, 5, 9, 2], 3)).toStrictEqual([
    [3, 1, 4],
    [1, 5, 9],
  ])
  expect(() => chunk([1, 2, 3], 0)).toThrowError()
})

test('zip', () => {
  expect([...zip(repeat.Iterable('a'), until.Iterable(3))]).toStrictEqual([
    ['a', 0],
    ['a', 1],
    ['a', 2],
  ])
  expect([...zip(repeat.Iterable('a'), until.Iterable(3), repeat.Iterable(0))]).toStrictEqual([
    ['a', 0, 0],
    ['a', 1, 0],
    ['a', 2, 0],
  ])
})

test('sort', () => {
  expect(sort([1, 2, 3])).toStrictEqual([1, 2, 3])
  expect(sort(['a', 'b', 'c'])).toStrictEqual(['a', 'b', 'c'])
  expect(sort([])).toStrictEqual([])
})

test('sortBy', () => {
  expect(sortBy([1, 2, 3], (x) => -x)).toStrictEqual([3, 2, 1])
  expect(sortBy(['alice', 'bob', 'charlie'], (x) => x.length)).toStrictEqual(['bob', 'alice', 'charlie'])
  expect(sortBy([], id)).toStrictEqual([])
})

test('shuffle', () => {
  expect(setOf(...shuffle([1, 2, 3, 4]))).toStrictEqual(setOf(1, 2, 3, 4))
  expect(shuffle([])).toStrictEqual([])
  expect(shuffle(['one'])).toStrictEqual(['one'])
})
