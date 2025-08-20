import { expect, test } from 'vitest'
import { identity } from './Function'
import { repeat } from './generate'
import { setOf } from './Set'
import {
  chunk,
  flatMap,
  flatMapDefer,
  flatMapIterable,
  flatMapIterableDefer,
  flatMapSet,
  flatten,
  flattenIterable,
  flattenSet,
  type Join,
  join,
  joinArray,
  map,
  mapDefer,
  mapIterable,
  mapIterableDefer,
  mapPromise,
  mapSet,
  padEndArray,
  padStartArray,
  type Reverse,
  removeDuplicates,
  reverse,
  reverseIterable,
  type Split,
  sort,
  sortBy,
  sortByDefer,
  split,
} from './transform'
import { assertTypeEquality } from './type'

test('map', () => {
  expect(map([1, 2, 3], (x) => x * 2)).toStrictEqual([2, 4, 6])
  expect(map([], (x) => x * 2)).toStrictEqual([])
})
test('mapDefer', async () => {
  expect(mapDefer((x: number) => x * 2)([1, 2, 3])).toStrictEqual([2, 4, 6])
  expect(mapDefer((x: number) => x * 2)([])).toStrictEqual([])
})
test('mapIterable', () => {
  expect([...mapIterable([1, 2, 3], (x) => x * 2)]).toStrictEqual([2, 4, 6])
  expect([...mapIterable([], (x) => x * 2)]).toStrictEqual([])
})
test('mapIterableDefer', () => {
  expect([...mapIterableDefer((x: number) => x * 2)([1, 2, 3])]).toStrictEqual([2, 4, 6])
  expect([...mapIterableDefer((x: number) => x * 2)([])]).toStrictEqual([])
})
test('mapSet', () => {
  expect(mapSet(setOf(1, 2, 3), (x) => x * 2)).toStrictEqual(setOf(2, 4, 6))
  expect(mapSet(setOf(), (x) => x * 2)).toStrictEqual(setOf())
})
test('mapPromise', () => {
  expect(mapPromise(Promise.resolve({ a: 123 }), ({ a }) => a)).resolves.toBe(123)
})

test('flatMap', () => {
  expect(flatMap([0, 1, 2], (x) => [x, x + 0.5])).toStrictEqual([0, 0.5, 1, 1.5, 2, 2.5])
  expect(flatMap([0, 1, 2], () => [])).toStrictEqual([])
  expect(flatMap([], (x) => [x, x + 0.5])).toStrictEqual([])
})
test('flatMapDefer', () => {
  expect(flatMapDefer((x: number) => [x, x + 0.5])([0, 1, 2])).toStrictEqual([0, 0.5, 1, 1.5, 2, 2.5])
  expect(flatMapDefer(() => [])([0, 1, 2])).toStrictEqual([])
  expect(flatMapDefer((x: number) => [x, x + 0.5])([])).toStrictEqual([])
})
test('flatMapIterable', () => {
  expect([...flatMapIterable([0, 1, 2], (x) => [x, x + 0.5])]).toStrictEqual([0, 0.5, 1, 1.5, 2, 2.5])
  expect([...flatMapIterable([0, 1, 2], () => [])]).toStrictEqual([])
  expect([...flatMapIterable([], (x) => [x, x + 0.5])]).toStrictEqual([])
})
test('flatMapIterableDefer', () => {
  expect([...flatMapIterableDefer((x: number) => [x, x + 0.5])([0, 1, 2])]).toStrictEqual([0, 0.5, 1, 1.5, 2, 2.5])
  expect([...flatMapIterableDefer(() => [])([0, 1, 2])]).toStrictEqual([])
  expect([...flatMapIterableDefer((x: number) => [x, x + 0.5])([])]).toStrictEqual([])
})
test('flatMapSet', () => {
  expect(flatMapSet(new Set([0, 1, 2]), (x) => [x, x + 0.5])).toStrictEqual(new Set([0, 0.5, 1, 1.5, 2, 2.5]))
  expect(flatMapSet(new Set([0, 1, 2]), () => [])).toStrictEqual(new Set())
  expect(flatMapSet([], (x) => [x, x + 0.5])).toStrictEqual(new Set())
})

test('flatten', () => {
  expect(
    flatten([
      [1, 2, 3],
      [4, 5],
      [6, 7, 8],
    ]),
  ).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8])
  expect(flatten([[1, 2], [], [3]])).toStrictEqual([1, 2, 3])
  expect(flatten([])).toStrictEqual([])
})
test('flattenIterable', () => {
  expect([
    ...flattenIterable([
      [1, 2, 3],
      [1, 2],
    ]),
  ]).toStrictEqual([1, 2, 3, 1, 2])
  expect([...flattenIterable([[], [1, 2]])]).toStrictEqual([1, 2])
  expect([...flattenIterable([])]).toStrictEqual([])
})
test('flattenSet', () => {
  expect(flattenSet(setOf(setOf(1, 2, 3), setOf(3, 4), setOf(4, 5, 6)))).toStrictEqual(setOf(1, 2, 3, 4, 5, 6))
  expect(flattenSet(setOf(setOf(1, 2, 3), setOf(), setOf(4)))).toStrictEqual(setOf(1, 2, 3, 4))
  expect(flattenSet(setOf())).toStrictEqual(setOf())
})

test('Join', () => {
  assertTypeEquality<Join<[]>, ''>()
  assertTypeEquality<Join<['a']>, 'a'>()
  assertTypeEquality<Join<['a', 'b']>, 'a,b'>()
  assertTypeEquality<Join<[1, 2]>, '1,2'>()
  assertTypeEquality<Join<[1, 2], ' + '>, '1 + 2'>()

  assertTypeEquality<Join<['a', 'b'], '.' | '/'>, 'a.b' | 'a/b'>()
  assertTypeEquality<Join<['a', 'b'], string>, `a${string}b`>()
  assertTypeEquality<Join<['a' | '0', 'b']>, 'a,b' | '0,b'>()
  assertTypeEquality<Join<['a', 'b'] | ['0']>, 'a,b' | '0'>()

  assertTypeEquality<Join<string[]>, string>()
  assertTypeEquality<Join<'1'[]>, string>()
  assertTypeEquality<Join<any>, string>()
  assertTypeEquality<Join<never>, never>()
})

test('join', () => {
  expect(join(['a', 'b', 'c'])).toStrictEqual('a,b,c')
  expect(join([1, 2], ' + ')).toStrictEqual('1 + 2')
  expect(join(['a', 'b', 'c'], '')).toStrictEqual('abc')
  expect(join(['a'])).toStrictEqual('a')
  expect(join([])).toStrictEqual('')
})
test('joinArray', () => {
  expect(
    joinArray(
      [
        [1, 2],
        [4, 5, 6],
        [7, 8],
      ],
      0,
    ),
  ).toStrictEqual([1, 2, 0, 4, 5, 6, 0, 7, 8])
  expect(joinArray([['a', 'b'], ['c']], true, 1)).toStrictEqual(['a', 'b', true, 1, 'c'])
  expect(joinArray([], '-')).toStrictEqual([])
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

  assertTypeEquality<Split<'abc', string>, string[]>()
  assertTypeEquality<Split<'abc', any>, string[]>()

  assertTypeEquality<Split<'a-b_c', '-' | '_'>, ['a', 'b_c'] | ['a-b', 'c']>()
  assertTypeEquality<Split<'abc', never>, never>()
})

test('split', () => {
  expect(split('12:34', ':')).toStrictEqual(['12', '34'])
  expect(split('a, b, c', ', ')).toStrictEqual(['a', 'b', 'c'])
  expect(split('12:34', '@')).toStrictEqual(['12:34'])
  expect(split('//', '/')).toStrictEqual(['', '', ''])
  expect(split('', 'a')).toStrictEqual([''])
  expect(split('', '')).toStrictEqual([''])
  expect(split('12:34', '')).toStrictEqual(['1', '2', ':', '3', '4'])
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

test('padStartArray', () => {
  expect(padStartArray([1, 2, 3], 6, 0)).toStrictEqual([0, 0, 0, 1, 2, 3])
  expect(padStartArray([1, 2, 3], 2, 0)).toStrictEqual([1, 2, 3])
  expect(padStartArray([], 4, 9)).toStrictEqual([9, 9, 9, 9])
})

test('padEndArray', () => {
  expect(padEndArray([1, 2, 3], 6, 0)).toStrictEqual([1, 2, 3, 0, 0, 0])
  expect(padEndArray([1, 2, 3], 2, 0)).toStrictEqual([1, 2, 3])
  expect(padEndArray([], 4, 9)).toStrictEqual([9, 9, 9, 9])
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

test('sortByDefer', () => {
  expect(sortByDefer((x: number) => -x)([1, 2, 3])).toStrictEqual([3, 2, 1])
  expect(sortByDefer((x: string) => x.length)(['alice', 'bob', 'charlie'])).toStrictEqual(['bob', 'alice', 'charlie'])
  expect(sortByDefer(identity)([])).toStrictEqual([])
})

test('reverse', () => {
  expect(reverse([1, 2, 3])).toStrictEqual([3, 2, 1])
  expect(reverse([1])).toStrictEqual([1])
  expect(reverse([])).toStrictEqual([])

  expect([...reverseIterable([1, 2, 3])]).toStrictEqual([3, 2, 1])
})

test('Reverse', () => {
  assertTypeEquality<Reverse<[0, 1]>, [1, 0]>()
  assertTypeEquality<Reverse<[0]>, [0]>()
  assertTypeEquality<Reverse<[]>, []>()
  assertTypeEquality<Reverse<[0, 1, ...2[]]>, [...2[], 1, 0]>()
  assertTypeEquality<Reverse<[1, 2, ...3[], 4, 5]>, [5, 4, ...3[], 2, 1]>()
  assertTypeEquality<Reverse<[0, 1] | [0]>, [0] | [1, 0]>()
  assertTypeEquality<Reverse<[0, 1?]>, [0] | [1, 0]>()
  assertTypeEquality<Reverse<[0?, 1?]>, [] | [0] | [1, 0]>()
  assertTypeEquality<Reverse<[1, 2, 3?, 4?, ...5[]]>, [...5[], 4, 3, 2, 1] | [...5[], 3, 2, 1] | [...5[], 2, 1]>()
})

test('removeDuplicates', () => {
  expect(removeDuplicates([3, 1, 4, 1, 5, 9])).toStrictEqual([3, 1, 4, 5, 9])
  expect(removeDuplicates(repeat(10, 'me'))).toStrictEqual(['me'])
  expect(removeDuplicates([])).toStrictEqual([])
  expect(removeDuplicates([null, null, null, undefined])).toStrictEqual([null, undefined])
})
