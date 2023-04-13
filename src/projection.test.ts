import { expect, test } from 'vitest'
import { keysOf, numberKeysOf } from './projection'
import { setOf } from './Set'

test('keys', () => {
  expect(new Set(keysOf({ abc: 3, def: true }))).toStrictEqual(setOf('abc', 'def'))
  expect(new Set(keysOf({ 0: '', 1: undefined, abc: null }))).toStrictEqual(setOf('0', '1', 'abc'))
})

test('numberKeys', () => {
  expect(new Set(numberKeysOf({ 10: [], 4: 'abc' }))).toStrictEqual(setOf(10, 4))
})
