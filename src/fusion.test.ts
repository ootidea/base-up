import { expect, test } from 'vitest'
import { merge, zip, zipAll, zipAllIterable, zipIterable, zipWith } from './fusion'
import { repeatIterable, sequentialNumbersUntilIterable } from './generate'

test('zip', () => {
  expect(zip([1, 2, 3], ['a', 'b', 'c'])).toStrictEqual([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
  ])
  expect(zip([1, 2, 3], ['a', 'b'])).toStrictEqual([
    [1, 'a'],
    [2, 'b'],
  ])
  expect(zip([1, 2, 3], ['a', 'b'], [true, false])).toStrictEqual([
    [1, 'a', true],
    [2, 'b', false],
  ])
  expect(zip([1, 2, 3])).toStrictEqual([[1], [2], [3]])

  expect([...zipIterable(repeatIterable('a'), sequentialNumbersUntilIterable(3))]).toStrictEqual([
    ['a', 0],
    ['a', 1],
    ['a', 2],
  ])
  expect([...zipIterable(repeatIterable('a'), sequentialNumbersUntilIterable(3), repeatIterable(0))]).toStrictEqual([
    ['a', 0, 0],
    ['a', 1, 0],
    ['a', 2, 0],
  ])
})

test('zipWith', () => {
  expect(zipWith((a, b) => a + b, [1, 2, 3], [5, 5, 5])).toStrictEqual([6, 7, 8])
})

test('zipAll', () => {
  expect(zipAll([1, 2, 3], ['a', 'b', 'c'])).toStrictEqual([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
  ])
  expect(zipAll([1, 2, 3], ['a', 'b'])).toStrictEqual([
    [1, 'a'],
    [2, 'b'],
    [3, undefined],
  ])
  expect(zipAll([1, 2, 3], ['a', 'b'], [true, false])).toStrictEqual([
    [1, 'a', true],
    [2, 'b', false],
    [3, undefined, undefined],
  ])
  expect(zipAll([1, 2, 3])).toStrictEqual([[1], [2], [3]])

  expect([...zipAllIterable([0, 1, 2, 3], ['a', 'b'])]).toStrictEqual([
    [0, 'a'],
    [1, 'b'],
    [2, undefined],
    [3, undefined],
  ])
})

test('merge', () => {
  expect(merge([1, 2, 3], ['a', 'b', 'c'])).toStrictEqual([1, 'a', 2, 'b', 3, 'c'])
  expect(merge([1, 2, 3, 4], ['a', 'b'])).toStrictEqual([1, 'a', 2, 'b', 3, 4])
  expect(merge([], ['a', 'b'])).toStrictEqual(['a', 'b'])
  expect(merge([1, 2, 3], [])).toStrictEqual([1, 2, 3])
  expect(merge([], [])).toStrictEqual([])
})
