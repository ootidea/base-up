import { repeat } from '../Iterable/other'
import { last, take } from './basic'

test('last', () => {
  expect(last([1, 2, 3])).toBe(3)
  expect(last([])).toBe(undefined)
})

test('take', () => {
  expect(take([1, 2, 3], 2)).toStrictEqual([1, 2])
  expect(take([1, 2, 3], 9)).toStrictEqual([1, 2, 3])
  expect(take([1, 2, 3], 0)).toStrictEqual([])
  expect(take([1, 2, 3])).toStrictEqual([1])
  expect(take(repeat(true), 3)).toStrictEqual([true, true, true])
  expect(take(repeat(true), 0)).toStrictEqual([])
})
