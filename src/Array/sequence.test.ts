import { repeat, until } from './sequence'

test('until', () => {
  expect(until(3)).toStrictEqual([0, 1, 2])
  expect(until(0)).toStrictEqual([])
})

test('repeat', () => {
  expect(repeat(3, true)).toStrictEqual([true, true, true])
  expect(repeat(2, true, 'done')).toStrictEqual([true, 'done', true, 'done'])
  expect(repeat(0, 123)).toStrictEqual([])
})
