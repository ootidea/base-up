import { expectTypeOf, test } from 'vitest'
import {
  type Branded,
  type DiscriminatedUnion,
  type MergeIntersection,
  type ToBasePrimitiveType,
  type Writable,
  assertTypeEquality,
} from './type'
import type { Equals } from './typePredicate'

test('Writable', () => {
  assertTypeEquality<Writable<{ readonly a: string }>, { a: string }>()
  assertTypeEquality<Writable<{ readonly a?: never }>, { a?: never }>()
  assertTypeEquality<Writable<readonly string[]>, string[]>()
  assertTypeEquality<Writable<readonly [string?, ...number[]]>, [string?, ...number[]]>()

  assertTypeEquality<Writable<{ nested: { readonly a: string } }>, { nested: { readonly a: string } }>()
  assertTypeEquality<Writable<readonly [readonly string[]]>, [readonly string[]]>()

  assertTypeEquality<Writable<never>, never>()
  assertTypeEquality<Writable<{ readonly a: 1 } | { b: 2 }>, { a: 1 } | { b: 2 }>()
  assertTypeEquality<Writable<1[] | readonly []>, 1[] | []>()
})

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

test('MergeIntersection', () => {
  assertTypeEquality<MergeIntersection<{ name: string } & { age: number }>, { name: string; age: number }>()
  assertTypeEquality<MergeIntersection<{}>, {}>()

  assertTypeEquality<MergeIntersection<{ nested: { a: 1 } & { b: 2 } }>, { nested: { a: 1 } & { b: 2 } }>()

  assertTypeEquality<MergeIntersection<1>, 1>()
  assertTypeEquality<MergeIntersection<null>, null>()
  assertTypeEquality<MergeIntersection<any>, any>()
  assertTypeEquality<MergeIntersection<unknown>, unknown>()
  assertTypeEquality<MergeIntersection<never>, never>()

  assertTypeEquality<MergeIntersection<1 | 2>, 1 | 2>()
  assertTypeEquality<
    MergeIntersection<{ size: number } | ({ name: string } & { age: number })>,
    { size: number } | { name: string; age: number }
  >()

  assertTypeEquality<MergeIntersection<any[]>, any[]>()
  assertTypeEquality<MergeIntersection<readonly any[]>, readonly any[]>()
  assertTypeEquality<MergeIntersection<[1, 2]>, [1, 2]>()
  assertTypeEquality<MergeIntersection<[1, ...2[]]>, [1, ...2[]]>()
  assertTypeEquality<MergeIntersection<[1?]>, [1?]>()

  assertTypeEquality<Equals<MergeIntersection<string & {}>, string & {}>, false>()
  assertTypeEquality<Equals<MergeIntersection<string & {}>, string>, false>()
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
  assertTypeEquality<DiscriminatedUnion<{ Circle: [] }>, MergeIntersection<{ type: 'Circle' } & []>>()
  assertTypeEquality<DiscriminatedUnion<{}>, never>()
  assertTypeEquality<
    DiscriminatedUnion<{ [Symbol.iterator]: { radius: number } }>,
    { type: typeof Symbol.iterator; radius: number }
  >()
})
