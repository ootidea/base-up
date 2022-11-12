import { repeat, repeatApply, until } from './sequence'

test('until', () => {
  expect(until(3)).toStrictEqual([0, 1, 2])
  expect(until(0)).toStrictEqual([])
})

test('repeat', () => {
  expect(repeat(3, true)).toStrictEqual([true, true, true])
  expect(repeat(2, true, 'done')).toStrictEqual([true, 'done', true, 'done'])
  expect(repeat(0, 123)).toStrictEqual([])
})

test('repeatApply', () => {
  expect(repeatApply(4, -5, (x) => x * -2)).toStrictEqual([-5, 10, -20, 40])
  expect(repeatApply(3, 'title', (text) => 're: ' + text)).toStrictEqual(['title', 're: title', 're: re: title'])
  expect(repeatApply(0, '123', (x) => x + 1)).toStrictEqual([])
})
