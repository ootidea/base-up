import { map, union } from './other'

test('map', () => {
  expect([...map(new Set([2, 1, 3]), (x) => x + 10)]).toStrictEqual([12, 11, 13])
})

test('union', () => {
  expect([...union(new Set([1, 2, 3]), new Set([3, 4, 5]))]).toStrictEqual([1, 2, 3, 4, 5])
})
