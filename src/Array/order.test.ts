import { id } from '../Function/other'
import { sortBy } from './order'

test('sortBy', () => {
  expect(sortBy([1, 2, 3], id)).toStrictEqual([1, 2, 3])
  expect(sortBy(['a', 'b', 'c'], id)).toStrictEqual(['a', 'b', 'c'])
  expect(sortBy([], id)).toStrictEqual([])
})
