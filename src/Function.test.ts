import { take } from './Array/basic'
import { curry, enunary, returnLast } from './Function'

test('curry', () => {
  const plus = (a: number, b: string) => a + b

  expect(curry(plus)(123)('abc')).toBe('123abc')
})

test('enunary', () => {
  const unary = enunary(take, 3)
  expect(unary([1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3])
})

test('returnLast', () => {
  expect(returnLast(1, 'second', false)).toBe(false)
  expect(returnLast()).toBe(undefined)
})
