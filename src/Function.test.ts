import { expect, test } from 'vitest'
import { curry, pipe, returnLast } from './Function'
import { rangeUntil } from './generate'

test('curry', () => {
  const plus = (a: number, b: string) => a + b

  expect(curry(plus)(123)('abc')).toBe('123abc')
})

test('returnLast', () => {
  expect(returnLast(1, 'second', false)).toBe(false)
  expect(returnLast()).toBe(undefined)
})

test('pipe', () => {
  expect(pipe(10, (x) => x / 2, rangeUntil)).toStrictEqual([0, 1, 2, 3, 4])
})
