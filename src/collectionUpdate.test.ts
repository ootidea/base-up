import { expect } from 'vitest'
import { insertAt, moveTo, push, removeAt, setAt, unshift } from './collectionUpdate'
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

test('removeAt', () => {
  expect(removeAt([0, 1, 2], 0)).toStrictEqual([1, 2])
  expect(removeAt([0, 1, 2], 1)).toStrictEqual([0, 2])
  expect(removeAt([0, 1, 2], 2)).toStrictEqual([0, 1])
  expect(removeAt([0, 1, 2], 3)).toStrictEqual([1, 2])
  expect(removeAt([0, 1, 2], -1)).toStrictEqual([0, 1])
  expect(removeAt([0, 1, 2], -2)).toStrictEqual([0, 2])
  expect(removeAt([0, 1, 2], -3)).toStrictEqual([1, 2])
  expect(removeAt([0, 1, 2], -4)).toStrictEqual([0, 1])
})

test('moveTo', () => {
  expect(moveTo([0, 1, 2], 0, 1)).toStrictEqual([1, 0, 2])
  expect(moveTo([0, 1, 2], 0, 2)).toStrictEqual([1, 2, 0])
  expect(moveTo([0, 1, 2], 1, 2)).toStrictEqual([0, 2, 1])
  expect(moveTo([0, 1, 2], 2, 2)).toStrictEqual([0, 1, 2])
  expect(moveTo([0, 1, 2], -1, 1)).toStrictEqual([0, 2, 1])
  expect(moveTo([0, 1, 2], -2, 0)).toStrictEqual([1, 0, 2])
  expect(moveTo([0, 1, 2], -3, 2)).toStrictEqual([1, 2, 0])
  expect(moveTo([0, 1, 2], 0, -1)).toStrictEqual([1, 2, 0])
  expect(moveTo([0, 1, 2], 0, -2)).toStrictEqual([1, 0, 2])
  expect(moveTo([0, 1, 2], 0, -3)).toStrictEqual([0, 1, 2])
})

test('setAt', () => {
  expect(setAt([0, 1, 2], 0, 9)).toStrictEqual([9, 1, 2])
  expect(setAt(['a', 'b', 'c'], -1, 'D')).toStrictEqual(['a', 'b', 'D'])
})
