import { expect, test } from 'vitest'
import { curry, pipe } from './Function'
import { rangeUntil } from './generate'

test('curry', () => {
  const plus = (a: number, b: string) => a + b

  expect(curry(plus)(123)('abc')).toBe('123abc')
})

test('pipe', () => {
  expect(pipe(10, (x) => x / 2, rangeUntil)).toStrictEqual([0, 1, 2, 3, 4])
})
