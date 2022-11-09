import { every, isEmpty, isNotEmpty } from './type'

test('isEmpty', () => {
  expect(isEmpty([1, 2, 3])).toBe(false)
  expect(isEmpty([])).toBe(true)
})

test('isNotEmpty', () => {
  expect(isNotEmpty([1, 2, 3])).toBe(true)
  expect(isNotEmpty([])).toBe(false)
})

test('every', () => {
  expect(every([1, 2, 3], (x) => x > 0)).toBe(true)
  expect(every([1, 2, 3], (x) => x > 2)).toBe(false)
  expect(every([], () => false)).toBe(true)
})
