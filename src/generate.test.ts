import { fromEntries, rangeThrough, rangeUntil, repeat, repeatApply } from './generate'
import { take } from './transform'

test('rangeUntil', () => {
  expect(rangeUntil(3)).toStrictEqual([0, 1, 2])
  expect(rangeUntil(-3)).toStrictEqual([0, -1, -2])
  expect(rangeUntil(0)).toStrictEqual([])
  expect(rangeUntil(2, 5)).toStrictEqual([2, 3, 4])
  expect(rangeUntil(2, -2)).toStrictEqual([2, 1, 0, -1])
  expect(rangeUntil(-2, 2)).toStrictEqual([-2, -1, 0, 1])
  expect(rangeUntil(-2, -5)).toStrictEqual([-2, -3, -4])
  expect(rangeUntil(3, 3)).toStrictEqual([])

  expect([...rangeUntil.Iterable(5)]).toStrictEqual([0, 1, 2, 3, 4])
})

test('rangeThrough', () => {
  expect(rangeThrough(3)).toStrictEqual([0, 1, 2, 3])
  expect(rangeThrough(-3)).toStrictEqual([0, -1, -2, -3])
  expect(rangeThrough(0)).toStrictEqual([0])
  expect(rangeThrough(2, 5)).toStrictEqual([2, 3, 4, 5])
  expect(rangeThrough(2, -2)).toStrictEqual([2, 1, 0, -1, -2])
  expect(rangeThrough(-2, 2)).toStrictEqual([-2, -1, 0, 1, 2])
  expect(rangeThrough(-2, -5)).toStrictEqual([-2, -3, -4, -5])
  expect(rangeThrough(3, 3)).toStrictEqual([3])
})

test('repeat', () => {
  expect(repeat(3, true)).toStrictEqual([true, true, true])
  expect(repeat(2, 0.5, 'done')).toStrictEqual([0.5, 'done', 0.5, 'done'])
  expect(repeat(1, 123)).toStrictEqual([123])
  expect(repeat(0, 123)).toStrictEqual([])
})

test('repeat.Iterator', () => {
  expect(take(repeat.Iterable(true), 5)).toStrictEqual([true, true, true, true, true])
  expect(take(repeat.Iterable(0, 9), 4)).toStrictEqual([0, 9, 0, 9])
})

test('repeatApply', () => {
  expect(repeatApply(4, -5, (x) => x * -2)).toStrictEqual([-5, 10, -20, 40])
  expect(repeatApply(3, 'title', (text) => 're: ' + text)).toStrictEqual(['title', 're: title', 're: re: title'])
  expect(repeatApply(0, '123', (x) => x + 1)).toStrictEqual([])
})

test('repeatApply.Iterator', () => {
  expect(
    take(
      repeatApply.Iterator(0, (x) => x + 3),
      5
    )
  ).toStrictEqual([0, 3, 6, 9, 12])
})

test('fromEntries', () => {
  const entries = [
    ['abc', 1],
    ['def', 2],
    [0, 3],
  ] as const
  const object = fromEntries(entries)

  expect(object.abc).toBe(1)
  expect(object.def).toBe(2)
  expect(object[0]).toBe(3)
})
