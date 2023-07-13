import { expectTypeOf, test } from 'vitest'
import { assertTypeEquality, Branded, DiscriminatedUnion, Simplify, ToBasePrimitiveType } from './type'
import { Equals } from './typePredicate'

test('Branded', () => {
  type UserId = Branded<number, 'UserId'>
  type PostId = Branded<number, 'PostId'>

  const userId: UserId = 1 as UserId
  const rawNumber: number = 1

  expectTypeOf(userId).toMatchTypeOf<number>()
  expectTypeOf(userId).toMatchTypeOf<UserId>()
  expectTypeOf(userId).not.toMatchTypeOf<PostId>()
  expectTypeOf(rawNumber).not.toMatchTypeOf<UserId>()
})

test('Simplify', () => {
  assertTypeEquality<Simplify<{ name: string } & { age: number }>, { name: string; age: number }>()
  assertTypeEquality<Simplify<{}>, {}>()
  assertTypeEquality<Equals<Simplify<string & {}>, string>, false>()

  assertTypeEquality<Simplify<1>, 1>()
  assertTypeEquality<Simplify<null>, null>()
  assertTypeEquality<Simplify<any>, any>()
  assertTypeEquality<Simplify<unknown>, unknown>()
  assertTypeEquality<Simplify<never>, never>()

  assertTypeEquality<Simplify<1 | 2>, 1 | 2>()
  assertTypeEquality<
    Simplify<{ size: number } | ({ name: string } & { age: number })>,
    { size: number } | { name: string; age: number }
  >()

  assertTypeEquality<Simplify<any[]>, any[]>()
  assertTypeEquality<Simplify<readonly any[]>, readonly any[]>()
  assertTypeEquality<Simplify<[1, 2]>, [1, 2]>()
  assertTypeEquality<Simplify<[1, ...2[]]>, [1, ...2[]]>()
  assertTypeEquality<Simplify<[1?]>, [1?]>()
})

test('ToBasePrimitiveType', () => {
  assertTypeEquality<ToBasePrimitiveType<'a'>, string>()
  assertTypeEquality<ToBasePrimitiveType<1>, number>()
  assertTypeEquality<ToBasePrimitiveType<1n>, bigint>()
  assertTypeEquality<ToBasePrimitiveType<true>, boolean>()
  const mySymbol = Symbol()
  assertTypeEquality<ToBasePrimitiveType<typeof mySymbol>, symbol>()
  assertTypeEquality<ToBasePrimitiveType<null>, null>()
  assertTypeEquality<ToBasePrimitiveType<undefined>, undefined>()

  assertTypeEquality<ToBasePrimitiveType<string>, string>()
  assertTypeEquality<ToBasePrimitiveType<number>, number>()
  assertTypeEquality<ToBasePrimitiveType<bigint>, bigint>()
  assertTypeEquality<ToBasePrimitiveType<boolean>, boolean>()
  assertTypeEquality<ToBasePrimitiveType<symbol>, symbol>()
  assertTypeEquality<ToBasePrimitiveType<object>, object>()
  assertTypeEquality<ToBasePrimitiveType<never>, never>()
  assertTypeEquality<ToBasePrimitiveType<unknown>, unknown>()
  assertTypeEquality<ToBasePrimitiveType<any>, any>()

  assertTypeEquality<ToBasePrimitiveType<1 | 'a'>, number | string>()

  assertTypeEquality<ToBasePrimitiveType<{}>, {}>()
  assertTypeEquality<ToBasePrimitiveType<{ a: 1 }>, { a: 1 }>()
  assertTypeEquality<ToBasePrimitiveType<[]>, []>()
  assertTypeEquality<ToBasePrimitiveType<1[]>, 1[]>()
})

test('DiscriminatedUnion', () => {
  assertTypeEquality<
    DiscriminatedUnion<{ Rect: { width: number; height: number }; Circle: { radius: number } }>,
    { type: 'Rect'; width: number; height: number } | { type: 'Circle'; radius: number }
  >()
  assertTypeEquality<DiscriminatedUnion<{ Circle: [] }>, Simplify<{ type: 'Circle' } & []>>()
  assertTypeEquality<DiscriminatedUnion<{}>, never>()
  assertTypeEquality<
    DiscriminatedUnion<{ [Symbol.iterator]: { radius: number } }>,
    { type: typeof Symbol.iterator; radius: number }
  >()
})
