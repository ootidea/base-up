import { expectTypeOf, test } from 'vitest'
import { assertTypeEquality, Branded, DiscriminatedUnion, IsClass, Simplify, ToBasePrimitiveType } from './type'
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

test('IsClass', () => {
  assertTypeEquality<IsClass<Date>, true>()
  assertTypeEquality<IsClass<RegExp>, true>()
  assertTypeEquality<IsClass<Blob>, true>()
  assertTypeEquality<IsClass<Error>, true>()
  assertTypeEquality<IsClass<URL>, true>()
  assertTypeEquality<IsClass<URLSearchParams>, true>()
  assertTypeEquality<IsClass<Number>, true>()
  assertTypeEquality<IsClass<ArrayBuffer>, true>()
  assertTypeEquality<IsClass<Int8Array>, true>()
  assertTypeEquality<IsClass<HTMLElement>, true>()

  class Empty {}
  assertTypeEquality<IsClass<Empty>, true>()

  assertTypeEquality<IsClass<Set<any>>, true>()
  assertTypeEquality<IsClass<WeakSet<any>>, true>()
  assertTypeEquality<IsClass<Map<any, any>>, true>()
  assertTypeEquality<IsClass<Promise<any>>, true>()

  // assertTypeEquality<IsClass<JSON>, false>()
  // assertTypeEquality<IsClass<Math>, false>()
  // assertTypeEquality<IsClass<Reflect>, false>()

  assertTypeEquality<IsClass<object>, true>()

  assertTypeEquality<IsClass<Function>, false>()
  assertTypeEquality<IsClass<any>, false>()
  assertTypeEquality<IsClass<unknown>, false>()
  assertTypeEquality<IsClass<never>, false>()
  assertTypeEquality<IsClass<void>, false>()
  assertTypeEquality<IsClass<undefined>, false>()
  assertTypeEquality<IsClass<null>, false>()
  assertTypeEquality<IsClass<symbol>, false>()
  assertTypeEquality<IsClass<string>, false>()
  assertTypeEquality<IsClass<number>, false>()
  assertTypeEquality<IsClass<bigint>, false>()
  assertTypeEquality<IsClass<boolean>, false>()
  assertTypeEquality<IsClass<0>, false>()
  assertTypeEquality<IsClass<''>, false>()
  assertTypeEquality<IsClass<[]>, false>()
  assertTypeEquality<IsClass<{}>, false>()
  assertTypeEquality<IsClass<() => any>, false>()

  assertTypeEquality<IsClass<null | Date>, false>()
  assertTypeEquality<IsClass<Error | Date>, false>()
  assertTypeEquality<IsClass<Date & {}>, true>()
})
