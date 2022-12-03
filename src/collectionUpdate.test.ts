import { insertAt, push, unshift } from './collectionUpdate'
import { repeat } from './generate'
import { take } from './transform'

test('push', () => {
  expect([...push.Iterable([3, 2, 1], 0)]).toStrictEqual([3, 2, 1, 0])
  expect([...push.Iterable([3, 2, 1], 0, -1)]).toStrictEqual([3, 2, 1, 0, -1])
})

test('unshift', () => {
  expect(unshift([1, 2, 3], 0)).toStrictEqual([0, 1, 2, 3])
  expect(unshift([1, 2, 3], -1, 0)).toStrictEqual([-1, 0, 1, 2, 3])
  expect(unshift([1, 2, 3], 'a')).toStrictEqual(['a', 1, 2, 3])
})

test('insertAt', () => {
  expect(insertAt([0, 1, 2], 0, 9)).toStrictEqual([9, 0, 1, 2])
  expect(insertAt([0, 1, 2], 3, 9)).toStrictEqual([0, 1, 2, 9])
  expect(insertAt([0, 1, 2], 4, 9)).toStrictEqual([9, 0, 1, 2])
  expect(insertAt([0, 1, 2], -1, 9)).toStrictEqual([0, 1, 2, 9])
  expect(insertAt([0, 1, 2], -2, 9)).toStrictEqual([0, 1, 9, 2])
  expect(insertAt([0, 1, 2], -4, 9)).toStrictEqual([9, 0, 1, 2])
  expect(insertAt([0, 1, 2], -5, 9)).toStrictEqual([0, 1, 2, 9])
  expect(insertAt([0, 1, 2], 2, 9, 8)).toStrictEqual([0, 1, 9, 8, 2])

  expect([...insertAt.Iterable([0, 1, 2], 0, 9)]).toStrictEqual([9, 0, 1, 2])
  expect([...insertAt.Iterable([0, 1, 2], 3, 9)]).toStrictEqual([0, 1, 2, 9])
  expect([...insertAt.Iterable([0, 1, 2], 1, 9, 8)]).toStrictEqual([0, 9, 8, 1, 2])
  expect(take(insertAt.Iterable(repeat.Iterable(true), 2, false), 4)).toStrictEqual([true, true, false, true])
  expect(take(insertAt.Iterable(repeat.Iterable(true), 6, false), 4)).toStrictEqual([true, true, true, true])
  expect(take(insertAt.Iterable(repeat.Iterable(true), -1, false), 4)).toStrictEqual([true, true, true, true])
})
