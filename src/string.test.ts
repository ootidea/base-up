import { toNumber, toString } from './string'

test('toNumber', () => {
  expect(toNumber('1.0')).toBe(1)
  expect(toNumber('-1')).toBe(-1)
  expect(toNumber('1_234')).toBeNaN()
  expect(toNumber('1,234')).toBeNaN()
})

test('toString', () => {
  expect(toString('abc')).toBe('abc')
  expect(toString(123)).toBe('123')
  expect(toString(123n)).toBe('123')
  expect(toString(1.0)).toBe('1')
  expect(toString(NaN)).toBe('NaN')
  expect(toString(Infinity)).toBe('Infinity')
  expect(toString(true)).toBe('true')
  expect(toString(null)).toBe('null')
  expect(toString(undefined)).toBe('undefined')
  expect(toString([])).toBe('')
})
