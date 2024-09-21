import { test } from 'vitest'
import type { IsBooleanLiteral, Not } from './boolean'
import { assertTypeEquality } from './type'

test('Not', () => {
  assertTypeEquality<Not<true>, false>()
  assertTypeEquality<Not<false>, true>()
  assertTypeEquality<Not<boolean>, boolean>()
  assertTypeEquality<Not<any>, boolean>()
  assertTypeEquality<Not<never>, never>()
})

test('IsBooleanLiteral', () => {
  assertTypeEquality<IsBooleanLiteral<true>, true>()
  assertTypeEquality<IsBooleanLiteral<false>, true>()
  assertTypeEquality<IsBooleanLiteral<true | false>, false>()
  assertTypeEquality<IsBooleanLiteral<boolean>, false>()
  assertTypeEquality<IsBooleanLiteral<any>, false>()
  assertTypeEquality<IsBooleanLiteral<never>, false>()
})
