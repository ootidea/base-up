import { lexicographicLt, lexicographicLte } from './comparison'

test('lexicographicLt', () => {
  expect(lexicographicLt([1, 2, 3], [1, 8, 0])).toStrictEqual(true)
  expect(lexicographicLt([1, 2, 3], [1, 2, 3])).toStrictEqual(false)
  expect(lexicographicLt([1, 2, 3], [1, 2, 3, 4])).toStrictEqual(true)
  expect(lexicographicLt([1, 2, 3], [1, 2])).toStrictEqual(false)
  expect(lexicographicLt([1, 2, 3], [5, 7])).toStrictEqual(true)
  expect(lexicographicLt([1, 2, 3], [0, 7])).toStrictEqual(false)
  expect(lexicographicLt([], [])).toStrictEqual(false)
})

test('lexicographicLte', () => {
  expect(lexicographicLte([1, 2, 3], [1, 8, 0])).toStrictEqual(true)
  expect(lexicographicLte([1, 2, 3], [1, 2, 3])).toStrictEqual(true)
  expect(lexicographicLte([1, 2, 3], [1, 2, 3, 4])).toStrictEqual(true)
  expect(lexicographicLte([1, 2, 3], [5, 7])).toStrictEqual(true)
  expect(lexicographicLte([1, 2, 3], [0, 7])).toStrictEqual(false)
  expect(lexicographicLte([], [])).toStrictEqual(true)
})
