import { zip, zipAll } from './fusion'
import { rangeTo, repeat } from './generate'

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

  expect([...zip.Iterable(repeat.Iterable('a'), rangeTo.Iterable(3))]).toStrictEqual([
    ['a', 0],
    ['a', 1],
    ['a', 2],
  ])
  expect([...zip.Iterable(repeat.Iterable('a'), rangeTo.Iterable(3), repeat.Iterable(0))]).toStrictEqual([
    ['a', 0, 0],
    ['a', 1, 0],
    ['a', 2, 0],
  ])
})

test('zipAll', () => {
  expect([...zipAll([0, 1, 2, 3], ['a', 'b'])]).toStrictEqual([
    [0, 'a'],
    [1, 'b'],
    [2, undefined],
    [3, undefined],
  ])
})
