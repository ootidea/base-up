import { expect, test } from 'vitest'
import { assertTypeEquality } from '../type'
import { factorialOf, Infinity, IsInteger, IsNumberLiteral, modOf, NegativeInfinity, roundAt, Trunc } from './other'

test('IsNumberLiteral', () => {
  assertTypeEquality<IsNumberLiteral<0>, true>()
  assertTypeEquality<IsNumberLiteral<1.5>, true>()
  assertTypeEquality<IsNumberLiteral<-1.5>, true>()
  assertTypeEquality<IsNumberLiteral<1.5e100>, true>()
  assertTypeEquality<IsNumberLiteral<-1.5e100>, true>()
  assertTypeEquality<IsNumberLiteral<1.5e-100>, true>()
  assertTypeEquality<IsNumberLiteral<-1.5e-100>, true>()
  assertTypeEquality<IsNumberLiteral<Infinity>, true>()
  assertTypeEquality<IsNumberLiteral<NegativeInfinity>, true>()
  assertTypeEquality<IsNumberLiteral<1 & {}>, true>()

  assertTypeEquality<IsNumberLiteral<1 | 2>, false>()
  assertTypeEquality<IsNumberLiteral<number>, false>()
  assertTypeEquality<IsNumberLiteral<any>, false>()
  assertTypeEquality<IsNumberLiteral<never>, false>()
})

test('IsInteger', () => {
  assertTypeEquality<IsInteger<3>, true>()
  assertTypeEquality<IsInteger<-10>, true>()
  assertTypeEquality<IsInteger<0>, true>()
  assertTypeEquality<IsInteger<-0>, true>()
  assertTypeEquality<IsInteger<0.5>, false>()
  assertTypeEquality<IsInteger<-10.5>, false>()

  assertTypeEquality<IsInteger<1e100>, true>()
  assertTypeEquality<IsInteger<-1e100>, true>()
  assertTypeEquality<IsInteger<1e-100>, false>()
  assertTypeEquality<IsInteger<-1e-100>, false>()

  assertTypeEquality<IsInteger<1.2e100>, true>()
  assertTypeEquality<IsInteger<-1.2e100>, true>()
  assertTypeEquality<IsInteger<1.2e-100>, false>()
  assertTypeEquality<IsInteger<-1.2e-100>, false>()

  assertTypeEquality<IsInteger<Infinity>, false>()
  assertTypeEquality<IsInteger<NegativeInfinity>, false>()

  assertTypeEquality<IsInteger<1 | 2>, true>()
  assertTypeEquality<IsInteger<1 | 2.5>, true | false>()
  assertTypeEquality<IsInteger<1.5 | 2.5>, false>()
  assertTypeEquality<IsInteger<number>, boolean>()
  assertTypeEquality<IsInteger<any>, boolean>()
  assertTypeEquality<IsInteger<never>, never>()
})

test('Trunc', () => {
  assertTypeEquality<Trunc<1>, 1>()
  assertTypeEquality<Trunc<1.5>, 1>()
  assertTypeEquality<Trunc<-1.5>, -1>()
  assertTypeEquality<Trunc<0>, 0>()
  assertTypeEquality<Trunc<1e100>, 1e100>()
  assertTypeEquality<Trunc<-1e100>, -1e100>()
  assertTypeEquality<Trunc<1.5e100>, 1.5e100>()
  assertTypeEquality<Trunc<-1.5e100>, -1.5e100>()
  assertTypeEquality<Trunc<1e-100>, 0>()
  assertTypeEquality<Trunc<-1e-100>, 0>()
  assertTypeEquality<Trunc<Infinity>, Infinity>()
  assertTypeEquality<Trunc<NegativeInfinity>, NegativeInfinity>()

  assertTypeEquality<Trunc<0 | 1.5>, 0 | 1>()
  assertTypeEquality<Trunc<number>, number>()
  assertTypeEquality<Trunc<any>, number>()
  assertTypeEquality<Trunc<never>, never>()
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

  expect(modOf(3.5, 2)).toBe(1.5)
  expect(modOf(0.5, 0.2)).toBe(0.09999999999999998)

  expect(modOf(Infinity, 2)).toBeNaN()
  expect(modOf(3, Infinity)).toBeNaN()
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
  expect(factorialOf(1.5)).toBeNaN()
  expect(factorialOf(Infinity)).toBeNaN()
  expect(factorialOf(-Infinity)).toBeNaN()
  expect(factorialOf(NaN)).toBeNaN()
})
