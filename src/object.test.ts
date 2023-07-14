import { expect, test } from 'vitest'
import { AtLeastOneProperty, CountProperties, getNestedProperty, OptionalKeysOf, RequiredKeysOf } from './object'
import { assertTypeEquality } from './type'

test('RequiredKeysOf', () => {
  assertTypeEquality<RequiredKeysOf<{ a: 1; b?: 2; c: 3 }>, 'a' | 'c'>()
  assertTypeEquality<RequiredKeysOf<{ value: string; 0: boolean }>, 'value' | 0>()
  assertTypeEquality<RequiredKeysOf<{ a?: 1 }>, never>()

  assertTypeEquality<RequiredKeysOf<[0, 1?, 2?]>, '0' | keyof []>()

  assertTypeEquality<RequiredKeysOf<Record<string, any>>, string>()
  assertTypeEquality<RequiredKeysOf<Record<number, null>>, number>()
  assertTypeEquality<RequiredKeysOf<Record<symbol, unknown>>, symbol>()
  assertTypeEquality<RequiredKeysOf<Record<string | number, unknown>>, string | number>()
  assertTypeEquality<RequiredKeysOf<Record<`#${number}`, unknown>>, `#${number}`>()

  assertTypeEquality<RequiredKeysOf<{ value: string } | { 0: boolean }>, 'value' | 0>()
})

test('OptionalKeysOf', () => {
  assertTypeEquality<OptionalKeysOf<{ a: 1; b?: 2; c: 3 }>, 'b'>()
  assertTypeEquality<OptionalKeysOf<{ value?: string; 0?: boolean }>, 'value' | 0>()
  assertTypeEquality<OptionalKeysOf<{ a: 1 }>, never>()
  assertTypeEquality<OptionalKeysOf<Record<string, any>>, never>()
  /*
  This is a counterintuitive result, but it's correct.
  Partial<Record<string, bigint>> is equivalent to { [key: string]: bigint | undefined }.
  So there are no optional keys.
  */
  assertTypeEquality<OptionalKeysOf<Partial<Record<string, bigint>>>, never>()

  assertTypeEquality<OptionalKeysOf<[0, 1?, 2?]>, '1' | '2'>()

  assertTypeEquality<OptionalKeysOf<{ value?: string } | { 0?: boolean }>, 'value' | 0>()
})

test('AtLeastOneProperty', () => {
  assertTypeEquality<
    AtLeastOneProperty<{ a: 1; b: 2; c: 3 }>,
    { a: 1; b?: 2; c?: 3 } | { a?: 1; b: 2; c?: 3 } | { a?: 1; b?: 2; c: 3 }
  >()
  assertTypeEquality<AtLeastOneProperty<{ a: 1; b?: 2; c: 3 }>, { a: 1; b?: 2; c?: 3 } | { a?: 1; b?: 2; c: 3 }>()
  assertTypeEquality<AtLeastOneProperty<{ a: 1; b?: 2 }>, { a: 1; b?: 2 }>()
  assertTypeEquality<AtLeastOneProperty<{ b?: 2 }>, never>()
  assertTypeEquality<AtLeastOneProperty<{}>, never>()
})

test('CountProperties', () => {
  assertTypeEquality<CountProperties<{ name: string; age: number }>, 2>()
  assertTypeEquality<CountProperties<{ name?: string; age?: number }>, 2>()
  assertTypeEquality<CountProperties<{ none: never }>, 1>()
  assertTypeEquality<CountProperties<{}>, 0>()
  assertTypeEquality<CountProperties<Record<never, any>>, 0>()
  assertTypeEquality<CountProperties<{ size: number } | { name: string; age: number }>, 1 | 2>()
  assertTypeEquality<CountProperties<Record<string, any>>, number>()
  assertTypeEquality<CountProperties<Record<string | 0, any>>, number>()
  assertTypeEquality<CountProperties<any>, number>()
  assertTypeEquality<CountProperties<never>, never>()
})

test('getProperty', () => {
  expect(getNestedProperty({ a: 123, b: { c: 'nested' } }, 'a')).toBe(123)
  expect(getNestedProperty({ a: 123, b: { c: 'nested' } }, 'b', 'c')).toBe('nested')
  expect(getNestedProperty({ a: 123, b: { c: 'nested' } }, 'z', 'x')).toBeUndefined()
  expect(getNestedProperty({ a: 123, b: { c: 'nested' } }, 'b')).toStrictEqual({ c: 'nested' })

  expect(getNestedProperty({ a: [true, { c: 'nested' }] }, 'a', 0)).toBe(true)
  expect(getNestedProperty({ a: [true, { c: 'nested' }] }, 'a', 1, 'c')).toBe('nested')

  expect(getNestedProperty({ 0: 'a', 5: 'b' }, 0)).toBe('a')
  expect(getNestedProperty({ 0: 'a', 5: 'b' }, 5)).toBe('b')

  expect(getNestedProperty({ a: 123 })).toStrictEqual({ a: 123 })
})
