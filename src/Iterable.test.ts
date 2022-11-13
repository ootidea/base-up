import { filter } from './filter'
import { repeat, repeatApply, until } from './generate'
import { elementAt, zip } from './Iterable'
import { take } from './transform'

test('until', () => {
  expect([...until.Iterable(5)]).toStrictEqual([0, 1, 2, 3, 4])
})

test('repeat', () => {
  expect(take(repeat.Iterable(true), 5)).toStrictEqual([true, true, true, true, true])
  expect(take(repeat.Iterable(1, 2), 4)).toStrictEqual([1, 2, 1, 2])
})

test('repeatApply', () => {
  expect(
    take(
      repeatApply.Iterator(0, (x) => x + 3),
      5
    )
  ).toStrictEqual([0, 3, 6, 9, 12])
})

test('elementAt', () => {
  expect(elementAt(until.Iterable(5), 0)).toBe(0)
  expect(elementAt(until.Iterable(5), 3)).toBe(3)
  expect(elementAt(until.Iterable(5), 5)).toBe(undefined)
})

test('filter', () => {
  expect([...filter.Iterable([1, 2, 3], (n) => n % 2 === 0)]).toStrictEqual([2])
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
