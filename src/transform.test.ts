import { expect, test } from 'vitest'
import { identity } from './Function'
import { repeat } from './generate'
import { setOf } from './Set'
import {
  chunk,
  flatten,
  Join,
  join,
  map,
  padEnd,
  padStart,
  removeDuplicates,
  Reverse,
  reverse,
  sort,
  sortBy,
  Split,
  tail,
} from './transform'
import { assertTypeEquality } from './type'

test('map', async () => {
  expect(map.Set(setOf(2, 1, 3), (x) => x + 10)).toStrictEqual(setOf(12, 11, 13))

  expect(await map.Promise(Promise.resolve({ a: 123 }), (value) => value.a)).toBe(123)
})

test('flatten', () => {
  expect(
    flatten([
      [1, 2, 3],
      [4, 5],
      [6, 7, 8],
    ])
  ).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8])
  expect(flatten([[1, 2], [], [3]])).toStrictEqual([1, 2, 3])
  expect(flatten([])).toStrictEqual([])

  expect(flatten.Set(setOf(setOf(1, 2, 3), setOf(3, 4), setOf(4, 5, 6)))).toStrictEqual(setOf(1, 2, 3, 4, 5, 6))
  expect(flatten.Set(setOf(setOf(1, 2, 3), setOf(), setOf(4)))).toStrictEqual(setOf(1, 2, 3, 4))
  expect(flatten.Set(setOf())).toStrictEqual(setOf())
})

test('tail', () => {
  expect(tail([1, 2, 3])).toStrictEqual([2, 3])
  expect(tail([1])).toStrictEqual([])
  expect(tail([])).toStrictEqual(undefined)
})

test('Join', () => {
  assertTypeEquality<Join<[]>, ''>()
  assertTypeEquality<Join<['a']>, 'a'>()
  assertTypeEquality<Join<['a', 'b']>, 'a,b'>()

  assertTypeEquality<Join<['a', 'b'], '.' | '/'>, 'a.b' | 'a/b'>()
  assertTypeEquality<Join<['a', 'b'], string>, `a${string}b`>()
  assertTypeEquality<Join<['a' | '0', 'b']>, 'a,b' | '0,b'>()
  assertTypeEquality<Join<['a', 'b'] | ['0']>, 'a,b' | '0'>()

  assertTypeEquality<Join<string[]>, string>()
  assertTypeEquality<Join<'1'[]>, string>()
  assertTypeEquality<Join<any>, string>()
  assertTypeEquality<Join<never>, never>()
})

test('join.Array', () => {
  expect(
    join.Array(
      [
        [1, 2],
        [4, 5, 6],
        [7, 8],
      ],
      0
    )
  ).toStrictEqual([1, 2, 0, 4, 5, 6, 0, 7, 8])
  expect(join.Array([['a', 'b'], ['c']], true, 1)).toStrictEqual(['a', 'b', true, 1, 'c'])
  expect(join.Array([], '-')).toStrictEqual([])
})

test('Split', () => {
  assertTypeEquality<Split<'12:34', ':'>, ['12', '34']>()
  assertTypeEquality<Split<'a, b, c', ', '>, ['a', 'b', 'c']>()
  assertTypeEquality<Split<'12:34', '@'>, ['12:34']>()
  assertTypeEquality<Split<'//', '/'>, ['', '', '']>()

  assertTypeEquality<Split<'', 'a'>, ['']>()
  assertTypeEquality<Split<'', ''>, ['']>()
  assertTypeEquality<Split<'12:34', ''>, ['1', '2', ':', '3', '4']>()

  assertTypeEquality<Split<`${number}:${number}`, ':'>, [`${number}`, `${number}`]>()
  assertTypeEquality<Split<`0${number}:1${number}`, ':'>, [`0${number}`, `1${number}`]>()
})

test('chunk', () => {
  expect(chunk([1, 2, 3, 4, 5, 6], 2)).toStrictEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
  expect(chunk([3, 1, 4, 1, 5, 9, 2], 3)).toStrictEqual([
    [3, 1, 4],
    [1, 5, 9],
  ])
  expect(() => chunk([1, 2, 3], 0)).toThrowError()
})

test('padStart', () => {
  expect(padStart([1, 2, 3], 6, 0)).toStrictEqual([0, 0, 0, 1, 2, 3])
  expect(padStart([1, 2, 3], 2, 0)).toStrictEqual([1, 2, 3])
  expect(padStart([], 4, 9)).toStrictEqual([9, 9, 9, 9])
})

test('padEnd', () => {
  expect(padEnd([1, 2, 3], 6, 0)).toStrictEqual([1, 2, 3, 0, 0, 0])
  expect(padEnd([1, 2, 3], 2, 0)).toStrictEqual([1, 2, 3])
  expect(padEnd([], 4, 9)).toStrictEqual([9, 9, 9, 9])
})

test('sort', () => {
  expect(sort([1, 2, 3])).toStrictEqual([1, 2, 3])
  expect(sort(['a', 'b', 'c'])).toStrictEqual(['a', 'b', 'c'])
  expect(sort([])).toStrictEqual([])
})

test('sortBy', () => {
  expect(sortBy([1, 2, 3], (x) => -x)).toStrictEqual([3, 2, 1])
  expect(sortBy(['alice', 'bob', 'charlie'], (x) => x.length)).toStrictEqual(['bob', 'alice', 'charlie'])
  expect(sortBy([], identity)).toStrictEqual([])
})

test('reverse', () => {
  expect(reverse([1, 2, 3])).toStrictEqual([3, 2, 1])
  expect(reverse([1])).toStrictEqual([1])
  expect(reverse([])).toStrictEqual([])

  expect([...reverse.Iterable([1, 2, 3])]).toStrictEqual([3, 2, 1])
})

test('Reverse', () => {
  assertTypeEquality<Reverse<[0, 1]>, [1, 0]>()
  assertTypeEquality<Reverse<[0]>, [0]>()
  assertTypeEquality<Reverse<[]>, []>()
  assertTypeEquality<Reverse<[0, 1, ...2[]]>, [...2[], 1, 0]>()
  assertTypeEquality<Reverse<[0, 1, ...number[], 9]>, [9, ...number[], 1, 0]>()
  assertTypeEquality<Reverse<[0, 1] | [0]>, [0] | [1, 0]>()
  assertTypeEquality<Reverse<[0, 1?]>, [0] | [1, 0]>()
  assertTypeEquality<Reverse<[0?, 1?]>, [] | [0] | [1, 0]>()
})

test('unique', () => {
  expect(removeDuplicates([3, 1, 4, 1, 5, 9])).toStrictEqual([3, 1, 4, 5, 9])
  expect(removeDuplicates(repeat(10, 'me'))).toStrictEqual(['me'])
  expect(removeDuplicates([])).toStrictEqual([])
  expect(removeDuplicates([null, null, null, undefined])).toStrictEqual([null, undefined])
})
