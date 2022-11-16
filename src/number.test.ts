import { factorialOf, gcdOf, mod, randomIntegerTo } from './number'

test('randomIntegerTo', () => {
  expect(randomIntegerTo(0)).toBe(0)
  expect(randomIntegerTo(1)).toBe(0)
  expect(randomIntegerTo(3) < 3).toBe(true)
  expect(0 <= randomIntegerTo(3)).toBe(true)
  expect(randomIntegerTo(-2) <= 0).toBe(true)
  expect(-2 < randomIntegerTo(-2)).toBe(true)
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
  expect(factorialOf(-1)).toBeNaN()
})

test('gcdOf', () => {
  expect(gcdOf(40, 120, 60)).toBe(20)
  expect(gcdOf(2, 99)).toBe(1)
  expect(gcdOf(99, 2)).toBe(1)
  expect(gcdOf(1, 99)).toBe(1)
  expect(gcdOf(99, 1)).toBe(1)
  expect(gcdOf(0, 99)).toBe(99)
  expect(gcdOf(99, 0)).toBe(99)
})
