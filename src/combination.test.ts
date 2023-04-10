import { cartesianProductOf, permutationOf, prefixesOf, slideWindow } from './combination'

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

test('permutationOf', () => {
  expect(permutationOf([1])).toStrictEqual([[1]])
  expect(permutationOf([1, 2])).toStrictEqual([
    [1, 2],
    [2, 1],
  ])
  expect(permutationOf([1, 2, 3])).toStrictEqual([
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ])
  expect(permutationOf([1, 2, 3], 2)).toStrictEqual([
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 1],
    [3, 2],
  ])
  expect(permutationOf([])).toStrictEqual([[]])
  expect(permutationOf([1], 5)).toStrictEqual([[1]])
  expect(permutationOf([1, 2], -5)).toStrictEqual([[]])

  expect(permutationOf.number(3, 1)).toBe(3)
  expect(permutationOf.number(3, 3)).toBe(6)
  expect(permutationOf.number(5, 2)).toBe(20)
})

test('slideWindow', () => {
  expect(slideWindow([1, 2, 3], 2)).toStrictEqual([
    [1, 2],
    [2, 3],
  ])
  expect(slideWindow([1, 2, 3], 3)).toStrictEqual([[1, 2, 3]])
  expect(slideWindow([1, 2, 3], 1)).toStrictEqual([[1], [2], [3]])
  expect(slideWindow([1, 2, 3], 0)).toStrictEqual([[], [], [], []])
  expect(slideWindow([1, 2, 3], 4)).toStrictEqual([])
  expect(slideWindow([], 0)).toStrictEqual([[]])
})

test('prefixesOf', () => {
  expect(prefixesOf([1, 2, 3])).toStrictEqual([[], [1], [1, 2], [1, 2, 3]])
  expect(prefixesOf([])).toStrictEqual([[]])
})
