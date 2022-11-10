import { mapOf } from './other'

test('mapOf', () => {
  expect(mapOf(['key', 1])).toStrictEqual(new Map([['key', 1]]))
  expect(mapOf([true, 1], [false, 0])).toStrictEqual(
    new Map([
      [true, 1],
      [false, 0],
    ])
  )
})
