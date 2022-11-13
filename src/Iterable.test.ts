import { repeat, until } from './generate'
import { elementAt, zip } from './Iterable'

test('elementAt', () => {
  expect(elementAt(until.Iterable(5), 0)).toBe(0)
  expect(elementAt(until.Iterable(5), 3)).toBe(3)
  expect(elementAt(until.Iterable(5), 5)).toBe(undefined)
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
