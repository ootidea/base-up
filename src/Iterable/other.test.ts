import { filter, repeat, repeatApply, take } from './other'

test('filter', () => {
  expect([...filter([1, 2, 3], (n) => n % 2 === 0)]).toStrictEqual([2])
})

test('take', () => {
  expect(take([1, 2, 3], 2)).toStrictEqual([1, 2])
  expect(take([1, 2, 3], 9)).toStrictEqual([1, 2, 3])
  expect(take([1, 2, 3], 0)).toStrictEqual([])
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
