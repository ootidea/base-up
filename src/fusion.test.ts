import { zip } from './fusion'
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
