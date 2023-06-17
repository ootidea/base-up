import { expect, test } from 'vitest'
import { AtLeastOneProperty, getNestedProperty, OptionalKeysOf, RequiredKeysOf } from './object'
import { assertTypeEquality } from './type'

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

test('RequiredKeysOf', () => {
  assertTypeEquality<RequiredKeysOf<{ a: 1; b?: 2; c: 3 }>, 'a' | 'c'>()
  assertTypeEquality<RequiredKeysOf<{ value: string; 0: boolean }>, 'value' | 0>()
  assertTypeEquality<RequiredKeysOf<{ a?: 1 }>, never>()

  assertTypeEquality<RequiredKeysOf<[0, 1?, 2?]>, '0' | keyof []>()
})

test('OptionalKeysOf', () => {
  assertTypeEquality<OptionalKeysOf<{ a: 1; b?: 2; c: 3 }>, 'b'>()
  assertTypeEquality<OptionalKeysOf<{ value?: string; 0?: boolean }>, 'value' | 0>()
  assertTypeEquality<OptionalKeysOf<{ a: 1 }>, never>()

  assertTypeEquality<OptionalKeysOf<[0, 1?, 2?]>, '1' | '2'>()
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
