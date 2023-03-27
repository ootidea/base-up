import { bindAllButFirst, curry, pipe, returnLast } from './Function'
import { rangeTo } from './generate'
import { take } from './transform'

test('curry', () => {
  const plus = (a: number, b: string) => a + b

  expect(curry(plus)(123)('abc')).toBe('123abc')
})

test('bindAllButFirst', () => {
  const unary = bindAllButFirst(take, 3)
  expect(unary([1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3])
})

test('returnLast', () => {
  expect(returnLast(1, 'second', false)).toBe(false)
  expect(returnLast()).toBe(undefined)
})

test('pipe', () => {
  expect(pipe(10, (x) => x / 2, rangeTo)).toStrictEqual([0, 1, 2, 3, 4])
})
