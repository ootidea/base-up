import { zip, zipAll } from './fusion'
import { rangeTo, repeat } from './generate'

test('zip', () => {
  expect([...zip(repeat.Iterable('a'), rangeTo.Iterable(3))]).toStrictEqual([
    ['a', 0],
    ['a', 1],
    ['a', 2],
  ])
  expect([...zip(repeat.Iterable('a'), rangeTo.Iterable(3), repeat.Iterable(0))]).toStrictEqual([
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
