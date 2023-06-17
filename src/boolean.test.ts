import { test } from 'vitest'
import { Not } from './boolean'
import { assertTypeEquality } from './type'

test('Not', () => {
  assertTypeEquality<Not<true>, false>()
  assertTypeEquality<Not<false>, true>()
  assertTypeEquality<Not<boolean>, boolean>()
  assertTypeEquality<Not<any>, boolean>()
  assertTypeEquality<Not<never>, never>()
})
