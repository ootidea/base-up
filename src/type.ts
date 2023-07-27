import { StrictFunction } from './Function'
import { Equals, IsOneOf } from './typePredicate'

/**
 * @example
 * assertTypeEquality<string, any>() results in a type error
 * assertTypeEquality<123, 123>()  does not result in a type error
 */
export function assertTypeEquality<T, U>(..._: Equals<T, U> extends true ? [] : [error: [T, 'is not equal to', U]]) {}

export function assert<T, U extends T>(value: T, predicate: (value: T) => value is U): asserts value is U
export function assert<T>(value: T, predicate: (value: T) => boolean): void
export function assert<T>(value: T, predicate: (value: T) => boolean) {
  if (!predicate(value)) {
    throw new Error()
  }
}

export function assertEqual<T, U extends T>(lhs: T, rhs: U): asserts lhs is U
export function assertEqual<T extends U, U>(lhs: T, rhs: U): asserts rhs is T
export function assertEqual<T, U>(lhs: T, rhs: U) {
  if (lhs !== (rhs as any)) {
    throw new Error()
  }
}

export function assertInstanceOf<T extends abstract new (..._: any) => any>(
  value: unknown,
  ctor: T,
): asserts value is InstanceType<T> {
  if (!(value instanceof ctor)) {
    throw new Error()
  }
}

/**
 * @example
 * let status: 'on' | 'off' = 'on'
 * switch (status) {
 *   case 'on':
 *     break
 *   case 'off':
 *     break
 *   default:
 *     assertNeverType(status)
 * }
 */
export function assertNeverType(mustBeNever: never): never {
  throw new Error(`Assertion error: ${mustBeNever} is not never type.`)
}

export type nullish = null | undefined

declare const DEFAULT_BRAND: unique symbol
export type Branded<T, Brand extends keyof any = typeof DEFAULT_BRAND> = T & Record<Brand, never>

/**
 * @example
 * Simplify<{ name: string } & { age: number }> equals { name: string; age: number }
 * Simplify<{ a: 1 } | ({ b: 2 } & { c: 3 })> equals { a: 1 } | { b: 2; c: 3 }
 */
export type Simplify<T> = T extends T ? (IsOneOf<T, [any, unknown]> extends true ? T : { [K in keyof T]: T[K] }) : never

/**
 * @example
 * UnionToIntersection<{ name: string } | { age: number }> equals { name: string } & { age: number }
 * UnionToIntersection<string[] | { 0: string }> equals string[] & { 0: string }
 * UnionToIntersection<number> equals number
 * UnionToIntersection<0 | 1> equals never
 */
export type UnionToIntersection<T> = (T extends T ? (arg: T) => any : never) extends (arg: infer U) => any ? U : never

/**
 * @example
 * IsUnion<true | false> equals true
 * IsUnion<boolean> equals true
 * IsUnion<{ name: string } | { age: number }> equals true
 * IsUnion<{ name: string } & { age: number }> equals false
 * IsUnion<keyof any> equals true
 * IsUnion<any> equals false
 * IsUnion<never> equals false
 * IsUnion<never | number> equals false
 */
export type IsUnion<T, Then = true, Else = false> = Equals<T, UnionToIntersection<T>, Else, Then>

/**
 * @example
 * ToBasePrimitiveType<'a'> equals string
 * ToBasePrimitiveType<1> equals number
 * ToBasePrimitiveType<true> equals boolean
 * ToBasePrimitiveType<undefined> equals undefined
 * ToBasePrimitiveType<null> equals null
 * @example
 * ToBasePrimitiveType<1 | 'a'> equals number | string
 */
export type ToBasePrimitiveType<T> = T extends T
  ? IsOneOf<T, [any, never, boolean]> extends true
    ? T
    : T extends string
    ? string
    : T extends number
    ? number
    : T extends bigint
    ? bigint
    : T extends boolean
    ? boolean
    : T extends symbol
    ? symbol
    : T
  : never

/**
 * Utility for defining tagged union types.
 * @example
 * DiscriminatedUnion<{ Rect: { width: number; height: number }; Circle: { radius: number } }>
 * equals
 * { type: 'Rect'; width: number; height: number } | { type: 'Circle'; radius: number }
 */
export type DiscriminatedUnion<T, D extends keyof any = 'type'> = {
  [K in keyof T]: Simplify<Record<D, K> & T[K]>
}[keyof T]

declare const lazyKey: unique symbol
/** One of the utilities to avoid the recursion limit */
export interface Lazy<T> {
  [lazyKey]: T
}
/** One of the utilities to avoid the recursion limit */
export type Unlazy<T> = T extends { [lazyKey]: unknown } ? Unlazy<ReduceLazy<T>> : T
type ReduceLazy<T> = T extends { [lazyKey]: never }
  ? never
  : T extends { [lazyKey]: { [lazyKey]: { [lazyKey]: { [lazyKey]: infer U } } } }
  ? { [lazyKey]: ReduceLazy<U> }
  : T extends { [lazyKey]: { [lazyKey]: { [lazyKey]: infer U } } }
  ? U
  : T extends { [lazyKey]: { [lazyKey]: infer U } }
  ? U
  : T extends { [lazyKey]: infer U }
  ? U
  : T

export type JsonValue = null | boolean | number | string | JsonValueArray | JsonValueObject
interface JsonValueArray extends ReadonlyArray<JsonValue> {}
interface JsonValueObject {
  [key: string]: JsonValue
}

/**
 * A superset of {@link JsonValue} type. The differences from JsonValue are as follows:
 * (1) It includes the undefined, bigint, and symbol types.
 * (2) It allows number and symbol as keys for objects.
 * @example
 * const v1: PlainValue = 123
 * const v2: PlainValue = ['abc']
 * const v3: PlainValue = { [Symbol.iterator]: 123 }
 * const v4: PlainValue = new Date() // Type error!
 * const v5: PlainValue = () => {} // Type error!
 * const v6: PlainValue = { blob: new Blob() } // Type error!
 */
export type PlainValue =
  | null
  | undefined
  | boolean
  | number
  | bigint
  | string
  | symbol
  | PlainValueArray
  | PlainValueObject
interface PlainValueArray extends ReadonlyArray<PlainValue> {}
interface PlainValueObject {
  [key: keyof any]: PlainValue
}

/**
 * A superset of {@link PlainValue} type, which includes function types.
 * It is a type that does not include classes.
 * You can customize additional types with a type parameter.
 */
export type ExtendedPlainValue<T = StrictFunction> =
  | T
  | null
  | undefined
  | boolean
  | number
  | bigint
  | string
  | symbol
  | ExtendedPlainValueArray<T>
  | ExtendedPlainValueObject<T>
interface ExtendedPlainValueArray<T> extends ReadonlyArray<ExtendedPlainValue<T>> {}
interface ExtendedPlainValueObject<T> {
  [key: keyof any]: ExtendedPlainValue<T>
}

declare const OMITTED: unique symbol
/** The default type of the type parameters */
export type OMITTED = typeof OMITTED
