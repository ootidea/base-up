import { expect, test } from 'vitest'
import { clamp } from './compare'
import { Infinity } from './other'

test('clamp', () => {
  expect(clamp(0, 5, 10)).toBe(5)
  expect(clamp(-10, -50, 0)).toBe(-10)
  expect(clamp(0.5, 0, 9.5)).toBe(0.5)
  expect(clamp(0, Infinity, 10)).toBe(10)
  expect(clamp(0, -Infinity, 10)).toBe(0)
  expect(clamp(0, 50, Infinity)).toBe(50)
  expect(clamp(-Infinity, 50, 100)).toBe(50)
  expect(clamp(0, NaN, 10)).toBeNaN()
  expect(clamp(0, 5, NaN)).toBeNaN()
  expect(clamp(NaN, 5, 10)).toBeNaN()
})
