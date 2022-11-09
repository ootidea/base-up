import { map } from './other'

test('map', () => {
  expect([...map(new Set([2, 1, 3]), (x) => x + 10)]).toBe([12, 11, 13])
})
