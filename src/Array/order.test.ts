import { id } from '../Function/other'
import { setOf } from '../Set/other'
import { shuffle, sort, sortBy } from './order'

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
