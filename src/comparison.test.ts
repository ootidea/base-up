import { lexicographicLt } from './comparison'

test('lexicographicLt', () => {
  expect(lexicographicLt([1, 2, 3], [1, 8, 0])).toStrictEqual(true)
  expect(lexicographicLt([1, 2, 3], [1, 2, 3])).toStrictEqual(false)
  expect(lexicographicLt([1, 2, 3], [1, 2, 3, 4])).toStrictEqual(true)
  expect(lexicographicLt([1, 2, 3], [5, 7])).toStrictEqual(true)
  expect(lexicographicLt([], [])).toStrictEqual(false)
})
