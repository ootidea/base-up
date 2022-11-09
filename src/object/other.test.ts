import { fromEntries, keys, numberKeys } from './other'

test('keys', () => {
  expect(keys({ abc: 3, def: true })).toBe(['abc', 'def'])
  expect(keys({ 0: '', 1: undefined, abc: null })).toBe(['0', '1', 'abc'])
})

test('fromEntries', () => {
  const entries = [
    ['abc', 1],
    ['def', 2],
    [0, 3],
  ] as const
  const object = fromEntries(entries)

  expect(object.abc).toBe(1)
  expect(object.def).toBe(2)
  expect(object[0]).toBe(3)
})

test('numberKeys', () => {
  expect(numberKeys({ 10: [], 4: 'abc' })).toBe([10, 4])
})
