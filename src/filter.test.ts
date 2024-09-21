import { expect, expectTypeOf, test } from 'vitest'
import type { MinLengthArray, NonEmptyArray } from './Array/MinLengthArray'
import { setOf } from './Set'
import {
  type Drop,
  type FirstOf,
  type LastOf,
  type Take,
  drop,
  dropIterable,
  dropLast,
  dropString,
  elementAt,
  filter,
  filterDefer,
  filterIterable,
  filterSet,
  firstOf,
  indexesOf,
  lastOf,
  modeBy,
  modeOf,
  take,
  takeDefer,
  takeString,
} from './filter'
import { repeatIterable, sequentialNumbersUntilIterable } from './generate'
import { assertTypeEquality } from './type'
import { isNotNull } from './typePredicate'

test('filter', () => {
  expect(filter([1, 2, 3], (n) => n % 2 === 0)).toStrictEqual([2])
  expect(filter([], (n) => n % 2 === 1)).toStrictEqual([])
  expectTypeOf(filter([], (n) => n % 2 === 1)).toEqualTypeOf<[]>()
  expect(filter([1, null, 3], isNotNull)).toStrictEqual([1, 3])
  expectTypeOf(filter([1, null, 3], isNotNull)).toEqualTypeOf<number[]>()
})
test('filterDefer', () => {
  expect(filterDefer(isNotNull)([1, null, 3])).toStrictEqual([1, 3])
  expectTypeOf(filterDefer(isNotNull<number>)([1, null, 3])).toEqualTypeOf<number[]>()
  expect(filterDefer(isNotNull)([])).toStrictEqual([])
  expectTypeOf(filterDefer(isNotNull)([])).toEqualTypeOf<[]>()
})
test('filterIterable', () => {
  expect([...filterIterable([1, 2, 3], (n) => n % 2 === 0)]).toStrictEqual([2])
})
test('filterSet', () => {
  expect(filterSet(setOf(0, 1, 2), (x) => x > 0)).toStrictEqual(setOf(1, 2))
  expect(filterSet(setOf(null, 1, 2), isNotNull)).toStrictEqual(setOf(1, 2))
})

test('firstOf', () => {
  expect(firstOf([1, 2, 3])).toBe(1)
  expect(firstOf([])).toBe(undefined)
})

test('FirstOf', () => {
  assertTypeEquality<FirstOf<[bigint]>, bigint>()
  assertTypeEquality<FirstOf<[bigint, number]>, bigint>()
  assertTypeEquality<FirstOf<[]>, undefined>()
  assertTypeEquality<FirstOf<boolean[]>, boolean | undefined>()
  assertTypeEquality<FirstOf<never[]>, undefined>()
  assertTypeEquality<FirstOf<[...string[], string]>, string>()
  assertTypeEquality<FirstOf<[...string[], boolean]>, string | boolean>()
  assertTypeEquality<FirstOf<[Date] | [boolean, Date]>, Date | boolean>()
  assertTypeEquality<FirstOf<[1?]>, 1 | undefined>()
  assertTypeEquality<FirstOf<[1?, 2?]>, 1 | 2 | undefined>()
  assertTypeEquality<FirstOf<[1?, ...2[]]>, 1 | 2 | undefined>()

  assertTypeEquality<FirstOf<[1] | [2]>, 1 | 2>()
  assertTypeEquality<FirstOf<any>, any>()
  assertTypeEquality<FirstOf<never>, never>()
})

test('lastOf', () => {
  expect(lastOf([1, 2, 3])).toBe(3)
  expect(lastOf([])).toBe(undefined)
})

test('LastOf', () => {
  assertTypeEquality<LastOf<[bigint]>, bigint>()
  assertTypeEquality<LastOf<[bigint, number]>, number>()
  assertTypeEquality<LastOf<[]>, undefined>()
  assertTypeEquality<LastOf<boolean[]>, boolean | undefined>()
  assertTypeEquality<LastOf<never[]>, undefined>()
  assertTypeEquality<LastOf<[string, ...string[]]>, string>()
  assertTypeEquality<LastOf<[boolean, ...string[]]>, boolean | string>()
  assertTypeEquality<LastOf<[...string[], bigint]>, bigint>()
  assertTypeEquality<LastOf<[Date] | [Date, boolean]>, Date | boolean>()
  assertTypeEquality<LastOf<[1, 2?]>, 1 | 2>()
  assertTypeEquality<LastOf<[1?, 2?]>, 1 | 2 | undefined>()
  assertTypeEquality<LastOf<[0, 1, 2?, ...3[]]>, 1 | 2 | 3>()

  assertTypeEquality<LastOf<[1] | [2]>, 1 | 2>()
  assertTypeEquality<LastOf<any>, any>()
  assertTypeEquality<LastOf<never>, never>()
})

test('Take', () => {
  assertTypeEquality<Take<[1, 2, 3], 0>, []>()
  assertTypeEquality<Take<[1, 2, 3], 2>, [1, 2]>()
  assertTypeEquality<Take<[1, 2, 3], 4>, [1, 2, 3]>()
  assertTypeEquality<Take<[1, ...2[]], 3>, [1] | [1, 2] | [1, 2, 2]>()
  assertTypeEquality<Take<Date[], 2>, [] | [Date] | [Date, Date]>()
  assertTypeEquality<Take<[...1[], 2], 3>, [2] | [1, 2] | [1, 1, 2] | [1, 1, 1]>()
  assertTypeEquality<
    Take<[1, 2, ...3[], 4, 5], 5>,
    [1, 2, 4, 5] | [1, 2, 3, 4, 5] | [1, 2, 3, 3, 4] | [1, 2, 3, 3, 3]
  >()
  assertTypeEquality<Take<[1, ...any], 2>, [1] | [1, any]>()
  assertTypeEquality<Take<any, 2>, [] | [any] | [any, any]>()

  assertTypeEquality<Take<[1, 2, 3], 0 | 1>, [] | [1]>()
  assertTypeEquality<Take<[1, 2, 3], never>, never>()
  assertTypeEquality<Take<[1, 2, 3], number>, [] | [1] | [1, 2] | [1, 2, 3]>()
  assertTypeEquality<Take<[1, 2, 3], any>, [] | [1] | [1, 2] | [1, 2, 3]>()
  assertTypeEquality<Take<never, 2>, never>()
})

test('take', () => {
  expect(take([1, 2, 3], 0)).toStrictEqual([])
  expect(take([1, 2, 3], 2)).toStrictEqual([1, 2])
  expect(take([1, 2, 3], 4)).toStrictEqual([1, 2, 3])
  expect(take('abc', 2)).toStrictEqual(['a', 'b'])
  expect(take(repeatIterable(true), 3)).toStrictEqual([true, true, true])
  expect(take(repeatIterable(true), 0)).toStrictEqual([])
})

test('takeDefer', () => {
  expect(takeDefer(0)([1, 2, 3])).toStrictEqual([])
  expect(takeDefer(2)([1, 2, 3])).toStrictEqual([1, 2])
  expect(takeDefer(4)([1, 2, 3])).toStrictEqual([1, 2, 3])
  expect(takeDefer(2)('abc')).toStrictEqual(['a', 'b'])
})

test('Drop', () => {
  assertTypeEquality<Drop<[1, 2, 3]>, [2, 3]>()
  assertTypeEquality<Drop<[1, 2, 3], 2>, [3]>()
  assertTypeEquality<Drop<[]>, []>()

  assertTypeEquality<Drop<[...Date[], Date, Date], 2>, Date[]>()
  assertTypeEquality<Drop<[...Date[], URL], 2>, [...Date[], URL]>()
  assertTypeEquality<Drop<NonEmptyArray<string>>, string[]>()
  assertTypeEquality<Drop<NonEmptyArray<string>, 2>, string[]>()
  assertTypeEquality<Drop<MinLengthArray<2, string>, 2>, string[]>()
  assertTypeEquality<Drop<MinLengthArray<2, string>>, NonEmptyArray<string>>()

  assertTypeEquality<Drop<string[], 3>, string[]>()
  assertTypeEquality<Drop<any, 3>, any>()
  assertTypeEquality<Drop<never, 3>, never>()

  // assertTypeEquality<Drop<[1?, 2?]>, [] | [2]>()

  // assertTypeEquality<Drop<readonly [1, 2, 3]>, readonly [2, 3]>()
  assertTypeEquality<Drop<readonly string[], 3>, readonly string[]>()
})

test('takeString', () => {
  expect(takeString('abc', 2)).toStrictEqual('ab')
  expect(takeString('abc', 0)).toStrictEqual('')
  expect(takeString('abc', 4)).toStrictEqual('abc')
})

test('drop', () => {
  expect(drop([1, 2, 3])).toStrictEqual([2, 3])
  expect(drop([1, 2, 3], -1 as number)).toStrictEqual([1, 2, 3])
  expect(drop([1, 2, 3], 0)).toStrictEqual([1, 2, 3])
  expect(drop([1, 2, 3], 1)).toStrictEqual([2, 3])
  expect(drop([1, 2, 3], 2)).toStrictEqual([3])
  expect(drop([1, 2, 3], 3)).toStrictEqual([])
  expect(drop([1, 2, 3], 4)).toStrictEqual([])
})

test('dropString', () => {
  expect(dropString('abc', 2)).toStrictEqual('c')
  expect(dropString('abc', 0)).toStrictEqual('abc')
  expect(dropString('abc', 4)).toStrictEqual('')
})

test('dropIterable', () => {
  expect([...dropIterable([0, 1, 2], 2)]).toStrictEqual([2])
  expect([...dropIterable([0, 1, 2], 0)]).toStrictEqual([0, 1, 2])
  expect([...dropIterable([0, 1, 2], 4)]).toStrictEqual([])
})

test('dropLast', () => {
  expect(dropLast([1, 2, 3])).toStrictEqual([1, 2])
  expect(dropLast([1, 2, 3], -1)).toStrictEqual([1, 2, 3])
  expect(dropLast([1, 2, 3], 0)).toStrictEqual([1, 2, 3])
  expect(dropLast([1, 2, 3], 1)).toStrictEqual([1, 2])
  expect(dropLast([1, 2, 3], 2)).toStrictEqual([1])
  expect(dropLast([1, 2, 3], 3)).toStrictEqual([])
  expect(dropLast([1, 2, 3], 4)).toStrictEqual([])

  expectTypeOf(dropLast([1, 2, 3])).toEqualTypeOf<[1, 2]>()
  expectTypeOf(dropLast([1, 2, 3], -1)).toEqualTypeOf<[1, 2, 3]>()
  expectTypeOf(dropLast([1, 2, 3], 0)).toEqualTypeOf<[1, 2, 3]>()
  expectTypeOf(dropLast([1, 2, 3], 1)).toEqualTypeOf<[1, 2]>()
})

test('indexesOf', () => {
  expect(indexesOf([true, false, true, true], true)).toStrictEqual([0, 2, 3])
  expect(indexesOf([], 123)).toStrictEqual([])
})

test('elementAt', () => {
  expect(elementAt(sequentialNumbersUntilIterable(5), 0)).toBe(0)
  expect(elementAt(sequentialNumbersUntilIterable(5), 3)).toBe(3)
  expect(elementAt(sequentialNumbersUntilIterable(5), 5)).toBe(undefined)
})

test('modeOf', () => {
  expect(modeOf([3, 1, 4, 1, 5])).toBe(1)
  expect(modeOf(['a', 'b', 'c'])).toBe('a')
  expect(modeOf([])).toBe(undefined)
})

test('modeBy', () => {
  const first = { id: 1, name: 'first' }
  const second = { id: 2, name: 'second' }
  const third = { id: 3, name: 'third' }
  expect(modeBy([second, first, second, third], (element) => element.id)).toBe(second)
  expect(modeBy([first, second, third], (element) => element.id)).toBe(first)
  expect(modeBy([], (element) => element)).toBeUndefined()
})
