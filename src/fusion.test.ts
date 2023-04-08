import { zip, zipAll, zipWith } from './fusion'
import { rangeUntil, repeat } from './generate'

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

  expect([...zip.Iterable(repeat.Iterable('a'), rangeUntil.Iterable(3))]).toStrictEqual([
    ['a', 0],
    ['a', 1],
    ['a', 2],
  ])
  expect([...zip.Iterable(repeat.Iterable('a'), rangeUntil.Iterable(3), repeat.Iterable(0))]).toStrictEqual([
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

  expect([...zipAll.Iterable([0, 1, 2, 3], ['a', 'b'])]).toStrictEqual([
    [0, 'a'],
    [1, 'b'],
    [2, undefined],
    [3, undefined],
  ])
})
