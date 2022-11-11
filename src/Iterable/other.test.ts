import { elementAt, filter, repeat, repeatApply, take, until } from './other'

test('until', () => {
  expect([...until(5)]).toStrictEqual([0, 1, 2, 3, 4])
})

test('repeat', () => {
  expect(take(repeat(true), 5)).toStrictEqual([true, true, true, true, true])
})

test('repeatApply', () => {
  expect(
    take(
      repeatApply(0, (x) => x + 3),
      5
    )
  ).toStrictEqual([0, 3, 6, 9, 12])
})

test('elementAt', () => {
  expect(elementAt(until(5), 0)).toBe(0)
  expect(elementAt(until(5), 3)).toBe(3)
  expect(elementAt(until(5), 5)).toBe(undefined)
})

test('take', () => {
  expect(take([1, 2, 3], 2)).toStrictEqual([1, 2])
  expect(take([1, 2, 3], 9)).toStrictEqual([1, 2, 3])
  expect(take([1, 2, 3], 0)).toStrictEqual([])
})

test('filter', () => {
  expect([...filter([1, 2, 3], (n) => n % 2 === 0)]).toStrictEqual([2])
})
