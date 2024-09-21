import { test } from 'vitest'
import type { IsBigintLiteral } from './bigint'
import { assertTypeEquality } from './type'

test('isBigintLiteral', () => {
  assertTypeEquality<IsBigintLiteral<0n>, true>()
  assertTypeEquality<IsBigintLiteral<5n>, true>()
  assertTypeEquality<IsBigintLiteral<-10n>, true>()
  assertTypeEquality<IsBigintLiteral<1n & {}>, true>()

  assertTypeEquality<IsBigintLiteral<1n | 2n>, false>()
  assertTypeEquality<IsBigintLiteral<bigint>, false>()
  assertTypeEquality<IsBigintLiteral<any>, false>()
  assertTypeEquality<IsBigintLiteral<never>, false>()
})
