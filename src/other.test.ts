import { expect, test } from 'vitest'
import { sequentialNumbersUntil } from './generate'
import { mapOf } from './Map'
import { groupBy, Mutable, sumOf, toMultiset } from './other'
import { assertTypeEquality } from './type'

test('Mutable', () => {
  assertTypeEquality<Mutable<{ readonly name: string; age: number }>, { name: string; age: number }>()
  assertTypeEquality<Mutable<readonly string[]>, string[]>()
  assertTypeEquality<Mutable<readonly [1, 2, 3]>, [1, 2, 3]>()

  assertTypeEquality<Mutable<{ nested: { readonly value: string } }>, { nested: { readonly value: string } }>()
  assertTypeEquality<Mutable<[readonly string[]]>, [readonly string[]]>()

  assertTypeEquality<Mutable<never>, never>()
})

test('groupBy', () => {
  expect(groupBy(sequentialNumbersUntil(8), (x) => x % 3)).toStrictEqual(
    mapOf([0, [0, 3, 6]], [1, [1, 4, 7]], [2, [2, 5]]),
  )
})
test('groupBy.Record', () => {
  expect(groupBy.Record(sequentialNumbersUntil(8), (x) => x % 3)).toStrictEqual({
    0: [0, 3, 6],
    1: [1, 4, 7],
    2: [2, 5],
  })
})

test('toMultiset', () => {
  expect(toMultiset(['a', 'a', 'b', 'c'])).toStrictEqual(
    new Map([
      ['a', 2],
      ['b', 1],
      ['c', 1],
    ]),
  )
  expect(toMultiset([null, undefined, null])).toStrictEqual(
    new Map([
      [null, 2],
      [undefined, 1],
    ]),
  )
  expect(toMultiset('Hello')).toStrictEqual(
    new Map([
      ['H', 1],
      ['e', 1],
      ['l', 2],
      ['o', 1],
    ]),
  )
})

test('sumOf', () => {
  expect(sumOf([1, 2, 3])).toBe(6)
  expect(sumOf([])).toBe(0)
})
