import { fromEntries, keys, numberKeys } from './object'
import { setOf } from './Set'

test('keys', () => {
  expect(new Set(keys({ abc: 3, def: true }))).toStrictEqual(setOf('abc', 'def'))
  expect(new Set(keys({ 0: '', 1: undefined, abc: null }))).toStrictEqual(setOf('0', '1', 'abc'))
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
  expect(new Set(numberKeys({ 10: [], 4: 'abc' }))).toStrictEqual(setOf(10, 4))
})
