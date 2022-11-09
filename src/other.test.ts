import { isInstanceOf } from './other'

test('isInstanceOf', () => {
  expect(isInstanceOf(Array, [])).toBe(true)
  expect(isInstanceOf(RegExp, /a/)).toBe(true)
  expect(isInstanceOf(Date, '2021-09-27T15:08:10.78')).toBe(false)
  expect(isInstanceOf(Object, {})).toBe(true)
})
