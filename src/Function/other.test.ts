import { curry, returnLast } from './other'

test('curry', () => {
  const plus = (a: number, b: string) => a + b

  expect(curry(plus)(123)('abc')).toBe('123abc')
})

test('returnLast', () => {
  expect(returnLast(1, 'second', false)).toBe(false)
  expect(returnLast()).toBe(undefined)
})
