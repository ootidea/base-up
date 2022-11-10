import { curry } from './other'

test('curry', () => {
  const plus = (a: number, b: string) => a + b

  expect(curry(plus)(123)('abc')).toBe('123abc')
})
