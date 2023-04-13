import { expect, test } from 'vitest'
import { isInstanceOf } from './type'

test('isInstanceOf', () => {
  expect(isInstanceOf([], Array)).toBe(true)
  expect(isInstanceOf(/a/, RegExp)).toBe(true)
  expect(isInstanceOf('2021-09-27T15:08:10.78', Date)).toBe(false)
  expect(isInstanceOf({}, Object)).toBe(true)
})
