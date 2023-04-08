import { clamp, factorialOf, gcdOf, modOf, randomIntegerThrough, randomIntegerUntil, roundAt } from './number'

test('randomIntegerTo', () => {
  expect(randomIntegerUntil(1)).toBe(0)
  expect(randomIntegerUntil(3) < 3).toBe(true)
  expect(0 <= randomIntegerUntil(3)).toBe(true)
  expect(randomIntegerUntil(-2) <= 0).toBe(true)
  expect(-2 < randomIntegerUntil(-2)).toBe(true)

  expect(20 <= randomIntegerUntil(20, 30)).toBe(true)
  expect(randomIntegerUntil(20, 30) < 30).toBe(true)
  expect(randomIntegerUntil(5, 6)).toBe(5)
  expect(randomIntegerUntil(5, 4)).toBe(5)
  expect(() => randomIntegerUntil(0)).toThrowError()
  expect(() => randomIntegerUntil(5, 5)).toThrowError()
  expect(-2 <= randomIntegerUntil(-2, 2)).toBe(true)
  expect(randomIntegerUntil(-2, 2) < 2).toBe(true)
  expect(-2 < randomIntegerUntil(2, -2)).toBe(true)
  expect(randomIntegerUntil(2, -2) <= 2).toBe(true)
})

test('randomIntegerThrough', () => {
  expect(randomIntegerThrough(0)).toBe(0)
  expect(randomIntegerThrough(3) <= 3).toBe(true)
  expect(0 <= randomIntegerThrough(3)).toBe(true)
  expect(randomIntegerThrough(-2) <= 0).toBe(true)
  expect(-2 <= randomIntegerThrough(-2)).toBe(true)

  expect(randomIntegerThrough(20, 30) <= 30).toBe(true)
  expect(20 <= randomIntegerThrough(20, 30)).toBe(true)
  expect(randomIntegerThrough(5, 5)).toBe(5)
  expect(-2 <= randomIntegerThrough(-2, 2)).toBe(true)
  expect(randomIntegerThrough(-2, 2) <= 2).toBe(true)
  expect(-2 <= randomIntegerThrough(2, -2)).toBe(true)
  expect(randomIntegerThrough(2, -2) <= 2).toBe(true)
})

test('clamp', () => {
  expect(clamp(0, 5, 10)).toBe(5)
  expect(clamp(-10, -50, 0)).toBe(-10)
  expect(clamp(0.5, 0, 9.5)).toBe(0.5)
  expect(clamp(0, Infinity, 10)).toBe(10)
  expect(clamp(0, -Infinity, 10)).toBe(0)
  expect(clamp(-Infinity, 0, Infinity)).toBe(0)
  expect(clamp(0, NaN, 10)).toBeNaN()
  expect(clamp(0, 5, NaN)).toBeNaN()
  expect(clamp(NaN, 5, 10)).toBeNaN()
  expect(clamp(100, 5, 0)).toBe(100)
})

test('modOf', () => {
  expect(modOf(4, 3)).toBe(1)
  expect(modOf(3, 3)).toBe(0)
  expect(modOf(2, 3)).toBe(2)
  expect(modOf(1, 3)).toBe(1)
  expect(modOf(0, 3)).toBe(0)
  expect(modOf(-1, 3)).toBe(2)
  expect(modOf(-2, 3)).toBe(1)
  expect(modOf(-3, 3)).toBe(0)
  expect(modOf(-4, 3)).toBe(2)

  expect(modOf(4, -3)).toBe(-2)
  expect(modOf(3, -3)).toBe(-0)
  expect(modOf(2, -3)).toBe(-1)
  expect(modOf(1, -3)).toBe(-2)
  expect(modOf(0, -3)).toBe(-0)
  expect(modOf(-1, -3)).toBe(-1)
  expect(modOf(-2, -3)).toBe(-2)
  expect(modOf(-3, -3)).toBe(-0)
  expect(modOf(-4, -3)).toBe(-1)
})

test('roundAt', () => {
  expect(roundAt(0.123, 3)).toBe(0.123)
  expect(roundAt(0.123, 2)).toBe(0.12)
  expect(roundAt(0.123, 1)).toBe(0.1)
  expect(roundAt(0.123, 0)).toBe(0)
  expect(roundAt(3.14159, 3)).toBe(3.142)
  expect(roundAt(12345, -1)).toBe(12350)
  expect(roundAt(12345, -2)).toBe(12300)
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
