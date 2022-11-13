import { keys, numberKeys } from './projection'
import { setOf } from './Set'

test('keys', () => {
  expect(new Set(keys({ abc: 3, def: true }))).toStrictEqual(setOf('abc', 'def'))
  expect(new Set(keys({ 0: '', 1: undefined, abc: null }))).toStrictEqual(setOf('0', '1', 'abc'))
})

test('numberKeys', () => {
  expect(new Set(numberKeys({ 10: [], 4: 'abc' }))).toStrictEqual(setOf(10, 4))
})
