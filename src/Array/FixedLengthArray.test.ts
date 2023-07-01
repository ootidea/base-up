import { test } from 'vitest'
import { assertTypeEquality } from '../type'
import { FixedLengthArray } from './FixedLengthArray'

test('FixedLengthArray', () => {
  assertTypeEquality<FixedLengthArray<1>, [unknown]>()
  assertTypeEquality<FixedLengthArray<2, boolean>, [boolean, boolean]>()
  assertTypeEquality<FixedLengthArray<0>, []>()

  assertTypeEquality<FixedLengthArray<0 | 2, any>, [] | [any, any]>()
  assertTypeEquality<FixedLengthArray<number>, unknown[]>()
  assertTypeEquality<FixedLengthArray<any>, unknown[]>()
  assertTypeEquality<FixedLengthArray<never>, never>()
})
