import { test } from 'vitest'
import { assertTypeEquality } from '../type'
import { SplitToWords, ToKebabCase } from './case'

test('SplitToWords', () => {
  assertTypeEquality<SplitToWords<'camelCase'>, ['camel', 'Case']>()
  assertTypeEquality<SplitToWords<'PascalCase'>, ['Pascal', 'Case']>()
  assertTypeEquality<SplitToWords<'kebab-case'>, ['kebab', 'case']>()
  assertTypeEquality<SplitToWords<'snake_case'>, ['snake', 'case']>()
  assertTypeEquality<SplitToWords<'SCREAMING_SNAKE_CASE'>, ['SCREAMING', 'SNAKE', 'CASE']>()
  assertTypeEquality<SplitToWords<'Title Case'>, ['Title', 'Case']>()
  assertTypeEquality<SplitToWords<'block__element--modifier'>, ['block', 'element', 'modifier']>()

  assertTypeEquality<SplitToWords<'camelCase' | 'PascalCase'>, ['camel', 'Case'] | ['Pascal', 'Case']>()
  assertTypeEquality<SplitToWords<''>, []>()
  assertTypeEquality<SplitToWords<string>, string[]>()
  assertTypeEquality<SplitToWords<any>, string[]>()
  assertTypeEquality<SplitToWords<never>, never>()
})

test('ToSnakeCase', () => {
  assertTypeEquality<ToKebabCase<'camelCase'>, 'camel-case'>()
  assertTypeEquality<ToKebabCase<'PascalCase'>, 'pascal-case'>()
  assertTypeEquality<ToKebabCase<'kebab-case'>, 'kebab-case'>()
  assertTypeEquality<ToKebabCase<'snake_case'>, 'snake-case'>()
  assertTypeEquality<ToKebabCase<'SCREAMING_SNAKE_CASE'>, 'screaming-snake-case'>()
  assertTypeEquality<ToKebabCase<'Title Case'>, 'title-case'>()
  assertTypeEquality<ToKebabCase<'block__element--modifier'>, 'block-element-modifier'>()

  assertTypeEquality<ToKebabCase<'camelCase' | 'PascalCase'>, 'camel-case' | 'pascal-case'>()
  assertTypeEquality<ToKebabCase<''>, ''>()
  assertTypeEquality<ToKebabCase<'---'>, ''>()
  assertTypeEquality<ToKebabCase<string>, string>()
  assertTypeEquality<ToKebabCase<any>, string>()
  assertTypeEquality<ToKebabCase<never>, never>()
})
