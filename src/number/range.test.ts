import { expect, test } from 'vitest'
import { assertTypeEquality } from '../type'
import { Infinity, NegativeInfinity } from './other'
import { IntegerRangeThrough, IntegerRangeUntil, randomIntegerThrough, randomIntegerUntil } from './range'

test('IntegerRangeUntil', () => {
  assertTypeEquality<IntegerRangeUntil<3>, 0 | 1 | 2>()
  assertTypeEquality<IntegerRangeUntil<0>, never>()
  assertTypeEquality<IntegerRangeUntil<-3>, 0 | -1 | -2>()

  assertTypeEquality<IntegerRangeUntil<2, 5>, 2 | 3 | 4>()
  assertTypeEquality<IntegerRangeUntil<5, 2>, 5 | 4 | 3>()
  assertTypeEquality<IntegerRangeUntil<-2, 2>, -2 | -1 | 0 | 1>()
  assertTypeEquality<IntegerRangeUntil<2, -2>, 2 | 1 | 0 | -1>()
  assertTypeEquality<IntegerRangeUntil<-2, -5>, -2 | -3 | -4>()
  assertTypeEquality<IntegerRangeUntil<-5, -2>, -5 | -4 | -3>()
  assertTypeEquality<IntegerRangeUntil<2, 2>, never>()
  assertTypeEquality<IntegerRangeUntil<-2, -2>, never>()

  assertTypeEquality<IntegerRangeUntil<1 | 3>, 0 | 1 | 2>()
  assertTypeEquality<IntegerRangeUntil<-2 | 2>, -1 | 0 | 1>()
  assertTypeEquality<IntegerRangeUntil<number>, number>()
  assertTypeEquality<IntegerRangeUntil<Infinity>, number>()
  assertTypeEquality<IntegerRangeUntil<NegativeInfinity>, number>()
  assertTypeEquality<IntegerRangeUntil<any>, number>()
  assertTypeEquality<IntegerRangeUntil<never>, never>()
})

test('IntegerRangeThrough', () => {
  assertTypeEquality<IntegerRangeThrough<2>, 0 | 1 | 2>()
  assertTypeEquality<IntegerRangeThrough<0>, 0>()
  assertTypeEquality<IntegerRangeThrough<-2>, 0 | -1 | -2>()

  assertTypeEquality<IntegerRangeThrough<2, 4>, 2 | 3 | 4>()
  assertTypeEquality<IntegerRangeThrough<4, 2>, 4 | 3 | 2>()
  assertTypeEquality<IntegerRangeThrough<-2, 2>, -2 | -1 | 0 | 1 | 2>()
  assertTypeEquality<IntegerRangeThrough<2, -2>, 2 | 1 | 0 | -1 | -2>()
  assertTypeEquality<IntegerRangeThrough<-2, -4>, -2 | -3 | -4>()
  assertTypeEquality<IntegerRangeThrough<-4, -2>, -4 | -3 | -2>()
  assertTypeEquality<IntegerRangeThrough<2, 2>, 2>()
  assertTypeEquality<IntegerRangeThrough<-2, -2>, -2>()

  assertTypeEquality<IntegerRangeThrough<1 | 2>, 0 | 1 | 2>()
  assertTypeEquality<IntegerRangeThrough<-1 | 1>, -1 | 0 | 1>()
  assertTypeEquality<IntegerRangeThrough<number>, number>()
  assertTypeEquality<IntegerRangeThrough<Infinity>, number>()
  assertTypeEquality<IntegerRangeThrough<NegativeInfinity>, number>()
  assertTypeEquality<IntegerRangeThrough<any>, number>()
  assertTypeEquality<IntegerRangeThrough<never>, never>()
})

test('randomIntegerUntil', () => {
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
