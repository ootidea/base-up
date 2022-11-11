import { randomIntegerUntil } from './other'

test('randomIntegerUntil', () => {
  expect(randomIntegerUntil(0)).toBe(0)
  expect(randomIntegerUntil(1)).toBe(0)
  expect(randomIntegerUntil(3) < 3).toBe(true)
  expect(0 <= randomIntegerUntil(3)).toBe(true)
})
