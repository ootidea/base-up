import { until } from './generate'
import { mapOf } from './Map'
import { groupBy } from './other'

test('groupBy', () => {
  expect(groupBy(until(8), (x) => x % 3)).toStrictEqual(mapOf([0, [0, 3, 6]], [1, [1, 4, 7]], [2, [2, 5]]))
})
