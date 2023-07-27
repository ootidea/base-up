import { expect, test } from 'vitest'
import { mapOf } from './Map'

test('mapOf', () => {
  expect(mapOf(['key', 1])).toStrictEqual(new Map([['key', 1]]))
  expect(mapOf([true, 1], [false, 0])).toStrictEqual(
    new Map([
      [true, 1],
      [false, 0],
    ]),
  )
  expect(mapOf()).toStrictEqual(new Map())
})
