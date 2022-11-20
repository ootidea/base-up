import { push, unshift } from './collectionUpdate'

test('push', () => {
  expect([...push.Iterable([3, 2, 1], 0)]).toStrictEqual([3, 2, 1, 0])
  expect([...push.Iterable([3, 2, 1], 0, -1)]).toStrictEqual([3, 2, 1, 0, -1])
})

test('unshift', () => {
  expect(unshift([1, 2, 3], 0)).toStrictEqual([0, 1, 2, 3])
  expect(unshift([1, 2, 3], -1, 0)).toStrictEqual([-1, 0, 1, 2, 3])
  expect(unshift([1, 2, 3], 'a')).toStrictEqual(['a', 1, 2, 3])
})
