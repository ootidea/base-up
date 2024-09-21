import { expect, test } from 'vitest'
import { assertTypeEquality } from './all'
import { type AllKeysOf, type AllValuesOf, allKeysOf, allValuesOf } from './projection'

test('AllKeysOf', () => {
  assertTypeEquality<AllKeysOf<{ name: string; age: number }>, ('name' | 'age')[]>()
  assertTypeEquality<AllKeysOf<{ 0: string; 1: number }>, ('0' | '1')[]>()
  assertTypeEquality<AllKeysOf<{ [Symbol.iterator]: boolean }>, (typeof Symbol.iterator)[]>()
  assertTypeEquality<AllKeysOf<{ name?: string; age?: number }>, ('name' | 'age')[]>()
  assertTypeEquality<AllKeysOf<{}>, []>()
  assertTypeEquality<AllKeysOf<undefined>, []>()
  assertTypeEquality<AllKeysOf<null>, []>()

  assertTypeEquality<AllKeysOf<{ name: string } | { age: number }>, 'name'[] | 'age'[]>()

  assertTypeEquality<AllKeysOf<Record<string, any>>, string[]>()
  assertTypeEquality<AllKeysOf<Record<number, any>>, `${number}`[]>()

  assertTypeEquality<AllKeysOf<{ name: string; birthday: Date }>, (string | symbol)[]>()
  assertTypeEquality<AllKeysOf<Date>, (string | symbol)[]>()
  class A {
    a = 1
  }
  assertTypeEquality<AllKeysOf<A>, (string | symbol)[]>()

  assertTypeEquality<AllKeysOf<[0, 1]>, (string | symbol)[]>()
  assertTypeEquality<AllKeysOf<() => any>, (string | symbol)[]>()
  assertTypeEquality<AllKeysOf<object>, (string | symbol)[]>()
  assertTypeEquality<AllKeysOf<string>, (string | symbol)[]>()
  assertTypeEquality<AllKeysOf<123>, (string | symbol)[]>()
  assertTypeEquality<AllKeysOf<any>, (string | symbol)[]>()
  assertTypeEquality<AllKeysOf<never>, never>()
})

test('allKeysOf', () => {
  expect(allKeysOf({ name: 'Bob', age: 30 })).toStrictEqual(['name', 'age'])
  expect(allKeysOf({})).toStrictEqual([])

  class A {
    a = 1
  }
  class B extends A {
    b = 2
  }
  expect(allKeysOf(new B())).toStrictEqual(['a', 'b'])

  expect(allKeysOf({ 0: false, 1: true })).toStrictEqual(['0', '1'])
  expect(allKeysOf({ [Symbol.iterator]: false })).toStrictEqual([Symbol.iterator])

  expect(allKeysOf(null)).toStrictEqual([])
  expect(allKeysOf(undefined)).toStrictEqual([])
})

test('AllValuesOf', () => {
  assertTypeEquality<AllValuesOf<{ name: string; age: number }>, (string | number)[]>()
  assertTypeEquality<AllValuesOf<{ 0: boolean; 1: bigint }>, (boolean | bigint)[]>()
  assertTypeEquality<AllValuesOf<{ [Symbol.iterator]: boolean }>, boolean[]>()
  assertTypeEquality<AllValuesOf<{ name?: string; age?: number }>, (string | number | undefined)[]>()
  assertTypeEquality<AllValuesOf<{ name: string } | { age: number }>, string[] | number[]>()
  assertTypeEquality<AllValuesOf<Record<number, bigint>>, bigint[]>()

  assertTypeEquality<AllValuesOf<{}>, never[]>()
  assertTypeEquality<AllValuesOf<undefined>, []>()
  assertTypeEquality<AllValuesOf<null>, []>()

  assertTypeEquality<AllValuesOf<any>, any[]>()
  assertTypeEquality<AllValuesOf<unknown>, unknown[]>()
  assertTypeEquality<AllValuesOf<never>, never>()
  assertTypeEquality<AllValuesOf<Date>, unknown[]>()
  assertTypeEquality<AllValuesOf<() => any>, unknown[]>()
  assertTypeEquality<AllValuesOf<[0, 1]>, unknown[]>()
})

test('allValuesOf', () => {
  expect(allValuesOf({ name: 'Bob', age: 30 })).toStrictEqual(['Bob', 30])
  expect(allValuesOf({})).toStrictEqual([])

  class A {
    a = 1
  }
  class B extends A {
    b = 2
  }
  expect(allValuesOf(new B())).toStrictEqual([1, 2])

  expect(allValuesOf({ 0: false, 1: true })).toStrictEqual([false, true])
  expect(allValuesOf({ [Symbol.iterator]: false })).toStrictEqual([false])

  expect(allValuesOf(null)).toStrictEqual([])
  expect(allValuesOf(undefined)).toStrictEqual([])
})
