import { expect, test } from 'vitest'
import {
  clamp,
  factorialOf,
  gcdOf,
  Infinity,
  IntegerRangeThrough,
  IntegerRangeUntil,
  IsInteger,
  IsNumberLiteral,
  isPrimeNumber,
  modOf,
  type NegativeInfinity,
  randomIntegerThrough,
  randomIntegerUntil,
  roundAt,
  Trunc,
} from './number'
import { assertTypeEquality } from './type'

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
  assertTypeEquality<IntegerRangeUntil<never>, number>()
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
  assertTypeEquality<IntegerRangeThrough<never>, number>()
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

test('gcdOf', () => {
  expect(gcdOf(40, 120, 60)).toBe(20)
  expect(gcdOf(2, 99)).toBe(1)
  expect(gcdOf(99, 2)).toBe(1)
  expect(gcdOf(1, 99)).toBe(1)
  expect(gcdOf(99, 1)).toBe(1)
  expect(gcdOf(0, 99)).toBe(99)
  expect(gcdOf(99, 0)).toBe(99)
})

test('isPrimeNumber', () => {
  const primeNumbersUnder1000 = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109,
    113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239,
    241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379,
    383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521,
    523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661,
    673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827,
    829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991,
    997,
  ]
  const primeNumberSet = new Set(primeNumbersUnder1000)
  for (let i = 0; i < 1000; i++) {
    expect(isPrimeNumber(i)).toBe(primeNumberSet.has(i))
  }

  expect(isPrimeNumber(-1)).toBe(false)
  expect(isPrimeNumber(2.5)).toBe(false)
  expect(isPrimeNumber(Infinity)).toBe(false)
  expect(isPrimeNumber(-Infinity)).toBe(false)
  expect(isPrimeNumber(NaN)).toBe(false)
})
