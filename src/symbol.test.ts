import { test } from 'vitest'
import type { IsSymbolLiteral } from './symbol'
import { assertTypeEquality } from './type'

test('IsSymbolLiteral', () => {
  const symbol = Symbol()
  const symbol2 = Symbol()
  assertTypeEquality<IsSymbolLiteral<typeof symbol>, true>()
  assertTypeEquality<IsSymbolLiteral<typeof symbol | typeof symbol2>, false>()
  assertTypeEquality<IsSymbolLiteral<symbol>, false>()
  assertTypeEquality<IsSymbolLiteral<never>, false>()
  assertTypeEquality<IsSymbolLiteral<any>, false>()
})
