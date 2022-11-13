import { repeat, repeatApply, until } from './generate'
import { take } from './transform'

test('until', () => {
  expect(until(3)).toStrictEqual([0, 1, 2])
  expect(until(0)).toStrictEqual([])

  expect([...until.Iterable(5)]).toStrictEqual([0, 1, 2, 3, 4])
})

test('repeat', () => {
  expect(repeat(3, true)).toStrictEqual([true, true, true])
  expect(repeat(2, true, 'done')).toStrictEqual([true, 'done', true, 'done'])
  expect(repeat(0, 123)).toStrictEqual([])

  expect(take(repeat.Iterable(true), 5)).toStrictEqual([true, true, true, true, true])
  expect(take(repeat.Iterable(1, 2), 4)).toStrictEqual([1, 2, 1, 2])
})

test('repeatApply', () => {
  expect(repeatApply(4, -5, (x) => x * -2)).toStrictEqual([-5, 10, -20, 40])
  expect(repeatApply(3, 'title', (text) => 're: ' + text)).toStrictEqual(['title', 're: title', 're: re: title'])
  expect(repeatApply(0, '123', (x) => x + 1)).toStrictEqual([])

  expect(
    take(
      repeatApply.Iterator(0, (x) => x + 3),
      5
    )
  ).toStrictEqual([0, 3, 6, 9, 12])
})
