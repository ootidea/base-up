import { expect, test } from 'vitest'
import { insertAt, moveTo, push, RemoveAt, removeAt, removePrefix, removeSuffix, unshift } from './collectionUpdate'
import { take } from './filter'
import { repeat } from './generate'
import { assertTypeEquality } from './type'

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
  expect(insertAt([0, 1, 2], 2, false, null)).toStrictEqual([0, 1, false, null, 2])

  expect(insertAt([0, 1, 2], 4, 9)).toStrictEqual([0, 1, 2])
  expect(insertAt([0, 1, 2], -1, 9)).toStrictEqual([0, 1, 2])
})
test('insertAt.Iterable', () => {
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
  expect(removeAt([0, 1, 2], 3)).toStrictEqual([0, 1, 2])
  expect(removeAt([0, 1, 2], -1)).toStrictEqual([0, 1, 2])
})

test('RemoveAt', () => {
  assertTypeEquality<RemoveAt<[0, 1, 2], 0>, [1, 2]>()
  assertTypeEquality<RemoveAt<[0, 1, 2], 1>, [0, 2]>()
  assertTypeEquality<RemoveAt<[0, 1, 2], 2>, [0, 1]>()
  assertTypeEquality<RemoveAt<[0, 1, 2], 5>, [0, 1, 2]>()
  assertTypeEquality<RemoveAt<[], 5>, []>()
  assertTypeEquality<RemoveAt<[0, ...1[]], 2>, [0, ...1[]]>()
  // assertTypeEquality<RemoveAt<[0, ...1[], 2], 2>, [0, ...1[], 2] | [0, 1]>()
  // assertTypeEquality<RemoveAt<[0, 1?, 2?], 2>, [0] | [0, 1]>()

  assertTypeEquality<RemoveAt<['a', 'b'] | [0, 1, 2], 1>, ['a'] | [0, 2]>()
  assertTypeEquality<RemoveAt<[0, 1, 2], 1 | 2>, [0, 2] | [0, 1]>()

  assertTypeEquality<RemoveAt<any[], 5>, any[]>()
  assertTypeEquality<RemoveAt<any, 5>, any[]>()
  assertTypeEquality<RemoveAt<never, 5>, never>()
})

test('removePrefix', () => {
  expect(removePrefix('ABCDE', 'AB')).toStrictEqual('CDE')
  expect(removePrefix('ABCDE', 'ABCDE')).toStrictEqual('')
  expect(removePrefix('ABCDE', '123')).toStrictEqual('ABCDE')
  expect(removePrefix('ABCDE', '')).toStrictEqual('ABCDE')
})

test('removeSuffix', () => {
  expect(removeSuffix('ABCDE', 'DE')).toStrictEqual('ABC')
  expect(removeSuffix('ABCDE', 'ABCDE')).toStrictEqual('')
  expect(removeSuffix('ABCDE', '123')).toStrictEqual('ABCDE')
  expect(removeSuffix('ABCDE', '')).toStrictEqual('ABCDE')
})

test('moveTo', () => {
  expect(moveTo([0, 1, 2], 0, 1)).toStrictEqual([1, 0, 2])
  expect(moveTo([0, 1, 2], 0, 2)).toStrictEqual([1, 2, 0])
  expect(moveTo([0, 1, 2], 1, 0)).toStrictEqual([1, 0, 2])
  expect(moveTo([0, 1, 2], 1, 1)).toStrictEqual([0, 1, 2])

  expect(moveTo([0, 1, 2], -1, 1)).toStrictEqual([0, 1, 2])
  expect(moveTo([0, 1, 2], 1, -1)).toStrictEqual([0, 1, 2])
})
