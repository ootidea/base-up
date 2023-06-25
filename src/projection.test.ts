import { describe, expect, expectTypeOf, test } from 'vitest'
import { allKeysOf, entriesOf, keysOf, numberKeysOf } from './projection'

test('keysOf', () => {
  expect(keysOf({ name: 'Bob', age: 30 })).toStrictEqual(['name', 'age'])
  expectTypeOf(keysOf({ name: 'Bob', age: 30 })).toEqualTypeOf<('name' | 'age')[]>()
  expectTypeOf(keysOf({ name: 'Bob', age: 30 } as Record<string, any>)).toEqualTypeOf<string[]>()
  expect(keysOf({ name: 'Bob', age: 60, [Symbol.iterator]: false })).toStrictEqual(['name', 'age'])
  expectTypeOf(keysOf({ name: 'Bob', age: 60, [Symbol.iterator]: false })).toEqualTypeOf<('name' | 'age')[]>()
  expect(keysOf({ 0: 'first', 1: undefined, 2: null })).toStrictEqual(['0', '1', '2'])
  expectTypeOf(keysOf({ 0: 'first', 1: undefined, 2: null })).toEqualTypeOf<('0' | '1' | '2')[]>()
  expect(keysOf({})).toStrictEqual([])
  expectTypeOf(keysOf({})).toEqualTypeOf<[]>()
  expect(keysOf({ [Symbol.iterator]: false })).toStrictEqual([])
  expectTypeOf(keysOf({ [Symbol.iterator]: false })).toEqualTypeOf<[]>()
  expect(keysOf([null, undefined])).toStrictEqual(['0', '1'])
  expectTypeOf(keysOf([null, undefined])).toEqualTypeOf<['0', '1']>()

  expectTypeOf(keysOf([1, 2] as number[])).toEqualTypeOf<string[]>()
  expectTypeOf(keysOf({} as Record<any, any>)).toEqualTypeOf<string[]>()

  expect(keysOf('abc')).toStrictEqual(['0', '1', '2'])
  expect(keysOf(123)).toStrictEqual([])
  expect(keysOf(true)).toStrictEqual([])
  expect(keysOf(/regexp/)).toStrictEqual([])
  expect(keysOf(Symbol())).toStrictEqual([])
  expect(keysOf(new Date())).toStrictEqual([])
  expect(keysOf(new Set())).toStrictEqual([])
})

describe('allKeysOf', () => {
  test('string keys', () => {
    expect(allKeysOf({ name: 'Bob', age: 30 })).toStrictEqual(new Set(['name', 'age']))
    expect(allKeysOf({})).toStrictEqual(new Set())
    expect(allKeysOf(123)).toStrictEqual(
      new Set(['toExponential', 'toFixed', 'toPrecision', 'toString', 'valueOf', 'toLocaleString'])
    )
    class A {
      a = 1
    }
    class B extends A {
      b = 2
    }
    expect(allKeysOf(new B())).toStrictEqual(new Set(['a', 'b']))
  })
  test('number keys', () => {
    expect(allKeysOf({ 0: false, 1: true })).toStrictEqual(new Set(['0', '1']))
  })
  test('symbol keys', () => {
    expect(allKeysOf({ [Symbol.iterator]: false })).toStrictEqual(new Set([Symbol.iterator]))
  })
})

test('numberKeysOf', () => {
  expect(numberKeysOf({ 0: 'first', 1: 'second' })).toStrictEqual([0, 1])
  expectTypeOf(numberKeysOf({ 0: 'first', 1: 'second' })).toEqualTypeOf<(0 | 1)[]>()

  expect(numberKeysOf({})).toStrictEqual([])
  expectTypeOf(numberKeysOf({})).toEqualTypeOf<[]>()
})

test('entriesOf', () => {
  expect(entriesOf({ name: 'Bob', age: 60 })).toStrictEqual([
    ['name', 'Bob'],
    ['age', 60],
  ])
  expectTypeOf(entriesOf({ name: 'Bob', age: 60 })).toEqualTypeOf<(['name', 'Bob'] | ['age', 60])[]>()

  expect(entriesOf({})).toStrictEqual([])
  expectTypeOf(entriesOf({})).toEqualTypeOf<[]>()

  expect(entriesOf({ 0: 'first' })).toStrictEqual([['0', 'first']])
  expectTypeOf(entriesOf({ 0: 'first' })).toEqualTypeOf<['0', 'first'][]>()

  expect(entriesOf({ normal: true, [Symbol.iterator]: true })).toStrictEqual([['normal', true]])
  expectTypeOf(entriesOf({ normal: true, [Symbol.iterator]: true })).toEqualTypeOf<['normal', true][]>()
})
