import { rangeTo } from './generate'
import { mapOf } from './Map'
import { groupBy, sum } from './other'

test('groupBy', () => {
  expect(groupBy(rangeTo(8), (x) => x % 3)).toStrictEqual(mapOf([0, [0, 3, 6]], [1, [1, 4, 7]], [2, [2, 5]]))
})

test('sum', () => {
  expect(sum([1, 2, 3])).toBe(6)
  expect(sum([])).toBe(0)
})
