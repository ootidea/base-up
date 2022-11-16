import { getProperty } from './object'

test('getProperty', () => {
  expect(getProperty({ a: 123, b: { c: 'nested' } }, 'a')).toBe(123)
  expect(getProperty({ a: 123, b: { c: 'nested' } }, 'b', 'c')).toBe('nested')
  expect(getProperty({ a: 123, b: { c: 'nested' } }, 'z', 'x')).toBeUndefined()
  expect(getProperty({ a: 123, b: { c: 'nested' } }, 'b')).toStrictEqual({ c: 'nested' })

  expect(getProperty({ a: [true, { c: 'nested' }] }, 'a', 0)).toBe(true)
  expect(getProperty({ a: [true, { c: 'nested' }] }, 'a', 1, 'c')).toBe('nested')

  expect(getProperty({ 0: 'a', 5: 'b' }, 0)).toBe('a')
  expect(getProperty({ 0: 'a', 5: 'b' }, 5)).toBe('b')
})
