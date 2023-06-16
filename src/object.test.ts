import { expect, test } from 'vitest'
import { getNestedProperty } from './object'

test('getProperty', () => {
  expect(getNestedProperty({ a: 123, b: { c: 'nested' } }, 'a')).toBe(123)
  expect(getNestedProperty({ a: 123, b: { c: 'nested' } }, 'b', 'c')).toBe('nested')
  expect(getNestedProperty({ a: 123, b: { c: 'nested' } }, 'z', 'x')).toBeUndefined()
  expect(getNestedProperty({ a: 123, b: { c: 'nested' } }, 'b')).toStrictEqual({ c: 'nested' })

  expect(getNestedProperty({ a: [true, { c: 'nested' }] }, 'a', 0)).toBe(true)
  expect(getNestedProperty({ a: [true, { c: 'nested' }] }, 'a', 1, 'c')).toBe('nested')

  expect(getNestedProperty({ 0: 'a', 5: 'b' }, 0)).toBe('a')
  expect(getNestedProperty({ 0: 'a', 5: 'b' }, 5)).toBe('b')
})
