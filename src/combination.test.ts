import { cartesianProductOf, prefixesOf, slide } from './combination'

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

test('slide', () => {
  expect(slide([1, 2, 3], 2)).toStrictEqual([
    [1, 2],
    [2, 3],
  ])
  expect(slide([1, 2, 3], 3)).toStrictEqual([[1, 2, 3]])
  expect(slide([1, 2, 3], 1)).toStrictEqual([[1], [2], [3]])
  expect(slide([1, 2, 3], 0)).toStrictEqual([[], [], [], []])
  expect(slide([1, 2, 3], 4)).toStrictEqual([])
  expect(slide([], 0)).toStrictEqual([[]])
})

test('prefixesOf', () => {
  expect(prefixesOf([1, 2, 3])).toStrictEqual([[], [1], [1, 2], [1, 2, 3]])
  expect(prefixesOf([])).toStrictEqual([[]])
})
