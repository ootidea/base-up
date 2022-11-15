import { factorialOf, mod, randomIntegerUntil } from './number'

test('randomIntegerUntil', () => {
  expect(randomIntegerUntil(0)).toBe(0)
  expect(randomIntegerUntil(1)).toBe(0)
  expect(randomIntegerUntil(3) < 3).toBe(true)
  expect(0 <= randomIntegerUntil(3)).toBe(true)
})

test('mod', () => {
  expect(mod(4, 3)).toBe(1)
  expect(mod(3, 3)).toBe(0)
  expect(mod(2, 3)).toBe(2)
  expect(mod(1, 3)).toBe(1)
  expect(mod(0, 3)).toBe(0)
  expect(mod(-1, 3)).toBe(2)
  expect(mod(-2, 3)).toBe(1)
  expect(mod(-3, 3)).toBe(0)
  expect(mod(-4, 3)).toBe(2)

  expect(mod(4, -3)).toBe(-2)
  expect(mod(3, -3)).toBe(-0)
  expect(mod(2, -3)).toBe(-1)
  expect(mod(1, -3)).toBe(-2)
  expect(mod(0, -3)).toBe(-0)
  expect(mod(-1, -3)).toBe(-1)
  expect(mod(-2, -3)).toBe(-2)
  expect(mod(-3, -3)).toBe(-0)
  expect(mod(-4, -3)).toBe(-1)
})

test('factorialOf', () => {
  expect(factorialOf(4)).toBe(4 * 3 * 2)
  expect(factorialOf(1)).toBe(1)
  expect(factorialOf(0)).toBe(1)
})
