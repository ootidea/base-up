import { expect, test } from 'vitest'
import { assertTypeEquality } from './all'
import { AllKeysOf, allKeysOf, allValuesOf, AllValuesOf } from './projection'

test('AllKeysOf', () => {
  assertTypeEquality<AllKeysOf<{ name: string; age: number }>, Set<'name' | 'age'>>()
  assertTypeEquality<AllKeysOf<{ 0: string; 1: number }>, Set<'0' | '1'>>()
  assertTypeEquality<AllKeysOf<{ [Symbol.iterator]: boolean }>, Set<typeof Symbol.iterator>>()
  assertTypeEquality<AllKeysOf<{ name?: string; age?: number }>, Set<'name' | 'age'>>()
  assertTypeEquality<AllKeysOf<{}>, Set<never>>()
  assertTypeEquality<AllKeysOf<undefined>, Set<never>>()
  assertTypeEquality<AllKeysOf<null>, Set<never>>()

  assertTypeEquality<AllKeysOf<{ name: string } | { age: number }>, Set<'name'> | Set<'age'>>()

  assertTypeEquality<AllKeysOf<Record<string, any>>, Set<string>>()
  assertTypeEquality<AllKeysOf<Record<number, any>>, Set<`${number}`>>()

  assertTypeEquality<AllKeysOf<{ name: string; birthday: Date }>, Set<string | symbol>>()
  assertTypeEquality<AllKeysOf<Date>, Set<string | symbol>>()
  class A {
    a = 1
  }
  assertTypeEquality<AllKeysOf<A>, Set<string | symbol>>()

  assertTypeEquality<AllKeysOf<[0, 1]>, Set<string | symbol>>()
  assertTypeEquality<AllKeysOf<() => any>, Set<string | symbol>>()
  assertTypeEquality<AllKeysOf<object>, Set<string | symbol>>()
  assertTypeEquality<AllKeysOf<string>, Set<string | symbol>>()
  assertTypeEquality<AllKeysOf<123>, Set<string | symbol>>()
  assertTypeEquality<AllKeysOf<any>, Set<string | symbol>>()
  assertTypeEquality<AllKeysOf<never>, never>()
})

test('allKeysOf', () => {
  expect(allKeysOf({ name: 'Bob', age: 30 })).toStrictEqual(new Set(['name', 'age']))
  expect(allKeysOf({})).toStrictEqual(new Set())

  class A {
    a = 1
  }
  class B extends A {
    b = 2
  }
  expect(allKeysOf(new B())).toStrictEqual(new Set(['a', 'b']))

  expect(allKeysOf({ 0: false, 1: true })).toStrictEqual(new Set(['0', '1']))
  expect(allKeysOf({ [Symbol.iterator]: false })).toStrictEqual(new Set([Symbol.iterator]))

  expect(allKeysOf(null)).toStrictEqual(new Set())
  expect(allKeysOf(undefined)).toStrictEqual(new Set())
})

test('AllValuesOf', () => {
  assertTypeEquality<AllValuesOf<{ name: string; age: number }>, Set<string | number>>()
  assertTypeEquality<AllValuesOf<{ 0: boolean; 1: bigint }>, Set<boolean | bigint>>()
  assertTypeEquality<AllValuesOf<{ [Symbol.iterator]: boolean }>, Set<boolean>>()
  assertTypeEquality<AllValuesOf<{ name?: string; age?: number }>, Set<string | number | undefined>>()
  assertTypeEquality<AllValuesOf<{ name: string } | { age: number }>, Set<string> | Set<number>>()
  assertTypeEquality<AllValuesOf<Record<number, bigint>>, Set<bigint>>()

  assertTypeEquality<AllValuesOf<{}>, Set<never>>()
  assertTypeEquality<AllValuesOf<undefined>, Set<never>>()
  assertTypeEquality<AllValuesOf<null>, Set<never>>()

  assertTypeEquality<AllValuesOf<any>, Set<unknown>>()
  assertTypeEquality<AllValuesOf<unknown>, Set<unknown>>()
  assertTypeEquality<AllValuesOf<never>, never>()
  assertTypeEquality<AllValuesOf<Date>, Set<unknown>>()
  assertTypeEquality<AllValuesOf<() => any>, Set<unknown>>()
  assertTypeEquality<AllValuesOf<[0, 1]>, Set<unknown>>()
})

test('allValuesOf', () => {
  expect(allValuesOf({ name: 'Bob', age: 30 })).toStrictEqual(new Set(['Bob', 30]))
  expect(allValuesOf({})).toStrictEqual(new Set())

  class A {
    a = 1
  }
  class B extends A {
    b = 2
  }
  expect(allValuesOf(new B())).toStrictEqual(new Set([1, 2]))

  expect(allValuesOf({ 0: false, 1: true })).toStrictEqual(new Set([false, true]))
  expect(allValuesOf({ [Symbol.iterator]: false })).toStrictEqual(new Set([false]))

  expect(allValuesOf(null)).toStrictEqual(new Set())
  expect(allValuesOf(undefined)).toStrictEqual(new Set())
})
