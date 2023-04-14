import { expect, test } from 'vitest'
import { shuffle } from './Array'
import { setOf } from './Set'

test('shuffle', () => {
  expect(setOf(...shuffle([1, 2, 3]))).toStrictEqual(setOf(1, 2, 3))
  expect(shuffle([1, 2, 3]).length).toEqual(3)
  expect(shuffle([])).toStrictEqual([])
  expect(shuffle(['one'])).toStrictEqual(['one'])
})
