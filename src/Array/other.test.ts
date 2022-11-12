import { cartesianProductOf, chunk } from './other'

test('chunk', () => {
  expect(chunk([1, 2, 3, 4, 5, 6], 2)).toStrictEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
  expect(chunk([3, 1, 4, 1, 5, 9, 2], 3)).toStrictEqual([
    [3, 1, 4],
    [1, 5, 9],
  ])
  expect(() => chunk([1, 2, 3], 0)).toThrowError()
})

test('cartesianProductOf', () => {
  expect(cartesianProductOf([0, 1], ['a', 'b'])).toStrictEqual([
    [0, 'a'],
    [0, 'b'],
    [1, 'a'],
    [1, 'b'],
  ])
  expect(cartesianProductOf([0, 1], [])).toStrictEqual([])
  expect(cartesianProductOf([], ['a', 'b'])).toStrictEqual([])
  expect(cartesianProductOf([0, 1], ['a'])).toStrictEqual([
    [0, 'a'],
    [1, 'a'],
  ])
})
