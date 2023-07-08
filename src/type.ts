import { IsEqual, IsOneOf } from './typePredicate'

/**
 * @example
 * assertTypeEquality<string, any>() results in a type error
 * assertTypeEquality<123, 123>()  does not result in a type error
 */
export function assertTypeEquality<T, U>(
  ..._: IsEqual<T, U> extends true ? [] : ['Assertion failed:', T, 'is not equal to', U]
) {}

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
  ctor: T
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
 * Simplify<{ name: string } & { age: number }> is equivalent to { name: string; age: number }
 * Simplify<{ a: 1 } | ({ b: 2 } & { c: 3 })> is equivalent to { a: 1 } | { b: 2; c: 3 }
 */
export type Simplify<T> = T extends T ? (IsOneOf<T, [any, unknown]> extends true ? T : { [K in keyof T]: T[K] }) : never

/**
 * @example
 * UnionToIntersection<{ name: string } | { age: number }> is equivalent to { name: string } & { age: number }
 * UnionToIntersection<string[] | { 0: string }> is equivalent to string[] & { 0: string }
 * UnionToIntersection<number> is equivalent to number
 * UnionToIntersection<0 | 1> is equivalent to never
 */
export type UnionToIntersection<T> = (T extends T ? (arg: T) => any : never) extends (arg: infer U) => any ? U : never

/**
 * @example
 * IsUnion<true | false> is equivalent to true
 * IsUnion<boolean> is equivalent to true
 * IsUnion<{ name: string } | { age: number }> is equivalent to true
 * IsUnion<{ name: string } & { age: number }> is equivalent to false
 * IsUnion<keyof any> is equivalent to true
 * IsUnion<any> is equivalent to false
 * IsUnion<never> is equivalent to false
 * IsUnion<never | number> is equivalent to false
 */
export type IsUnion<T, Then = true, Else = false> = IsEqual<T, UnionToIntersection<T>, Else, Then>

/**
 * @example
 * ToBasePrimitiveType<'a'> is equivalent to string
 * ToBasePrimitiveType<1> is equivalent to number
 * ToBasePrimitiveType<true> is equivalent to boolean
 * ToBasePrimitiveType<undefined> is equivalent to undefined
 * ToBasePrimitiveType<null> is equivalent to null
 * @example
 * ToBasePrimitiveType<1 | 'a'> is equivalent to number | string
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
 * is equivalent to
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
interface JsonValueArray extends Array<JsonValue> {}
interface JsonValueObject {
  [key: string]: JsonValue
}

/**
 * A superset of {@link JsonValue}.
 * It includes types undefined, bigint, and symbol.
 * Keys for objects can be of type number and symbol.
 * Just like JSON, it does not include function and class types.
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
interface PlainValueArray extends Array<PlainValue> {}
interface PlainValueObject {
  [key: keyof any]: PlainValue
}

export type NonClassValue =
  | null
  | undefined
  | boolean
  | number
  | bigint
  | string
  | symbol
  | Function
  | NonClassValueArray
  | NonClassValueObject
interface NonClassValueArray extends Array<NonClassValue> {}
interface NonClassValueObject {
  [key: keyof any]: NonClassValue
}

export type IsClass<T> = T extends NonClassValue
  ? // In the scope of our current analysis, only the Blob type exhibits unique characteristics.
    IsEqual<T, Blob>
  : true
