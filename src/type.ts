import { Tuple } from './Array'

/**
 * Determines whether the types are strictly the same or not.
 * This was implemented with reference to: {@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650}
 * @example
 * IsEqual<123, 123> is equivalent to true
 * IsEqual<123, 456> is equivalent to false
 * IsEqual<123, number> is equivalent to false
 * IsEqual<void, undefined> is equivalent to false
 * IsEqual<any, unknown> is equivalent to false
 * IsEqual<never, any> is equivalent to false
 * @example
 * IsEqual<'a' | 'b', 'b' | 'a'> is equivalent to true
 * IsEqual<1, 1 | never> is equivalent to true
 * IsEqual<boolean, true | false> is equivalent to true
 * @example
 * IsEqual<[a: string], [b: string]> is equivalent to true
 * IsEqual<[string?], [] | [string]> is equivalent to false
 * @example
 * IsEqual<{}, {}> is equivalent to true
 */
export type IsEqual<T, U, Then = true, Else = false> = (<R>() => R extends T ? 1 : 2) extends <R>() => R extends U
  ? 1
  : 2
  ? Then
  : Else

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

export function assertEquals<T, U extends T>(lhs: T, rhs: U): asserts lhs is U
export function assertEquals<T extends U, U>(lhs: T, rhs: U): asserts rhs is T
export function assertEquals<T, U>(lhs: T, rhs: U) {
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
export function assertNeverType(shouldBeNever: never): never {
  throw new Error()
}

export type nullish = null | undefined

export const isNull = (value: unknown): value is null => value === null
export const isUndefined = (value: unknown): value is undefined => value === undefined
export const isNullish = (value: unknown): value is nullish => value === null || value === undefined
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'
export const isNumber = (value: unknown): value is number => typeof value === 'number'
export const isBigint = (value: unknown): value is bigint => typeof value === 'bigint'
export const isString = (value: unknown): value is string => typeof value === 'string'
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol'
export const isFunction = (value: unknown): value is Function => typeof value === 'function'
export const isObject = (value: unknown): value is object => typeof value === 'object'

export const isNotNull = <T>(value: T | null): value is T => value !== null
export const isNotUndefined = <T>(value: T | undefined): value is T => value !== undefined
export const isNotNullish = <T>(value: T | nullish): value is T => value !== null && value !== undefined
export const isNotBoolean = <T>(value: T | boolean): value is T => typeof value !== 'boolean'
export const isNotNumber = <T>(value: T | number): value is T => typeof value !== 'number'
export const isNotBigint = <T>(value: T | bigint): value is T => typeof value !== 'bigint'
export const isNotString = <T>(value: T | string): value is T => typeof value !== 'string'
export const isNotSymbol = <T>(value: T | symbol): value is T => typeof value !== 'symbol'
export const isNotFunction = <T>(value: T | Function): value is T => typeof value !== 'function'
export const isNotObject = <T>(value: T | symbol): value is T => typeof value !== 'object'

/**
 * @example
 * isTruthy(false) returns false
 * isTruthy(undefined) returns false
 * isTruthy(null) returns false
 * isTruthy(0) returns false
 * isTruthy(0n) returns false
 * isTruthy('') returns false
 * isTruthy(NaN) returns false
 * @example
 * isTruthy(true) returns true
 * isTruthy(1) returns true
 * isTruthy(1n) returns true
 * isTruthy('a') returns true
 * isTruthy({}) returns true
 * isTruthy([]) returns true
 * isTruthy(() => {}) returns true
 */
export function isTruthy(value: false | null | undefined | 0 | 0n | ''): false
export function isTruthy<T>(value: T | false | null | undefined | 0 | 0n | ''): value is T
export function isTruthy<T>(value: T | false | null | undefined | 0 | 0n | ''): value is T {
  return Boolean(value)
}

/**
 * @example
 * isFalsy(false) returns true
 * isFalsy(undefined) returns true
 * isFalsy(null) returns true
 * isFalsy(0) returns true
 * isFalsy(0n) returns true
 * isFalsy('') returns true
 * isFalsy(NaN) returns true
 * @example
 * isFalsy(true) returns false
 * isFalsy(1) returns false
 * isFalsy(1n) returns false
 * isFalsy('a') returns false
 * isFalsy({}) returns false
 * isFalsy([]) returns false
 * isFalsy(() => {}) returns false
 */
export function isFalsy(value: false | null | undefined | 0 | 0n | ''): true
export function isFalsy(value: unknown): value is false | null | undefined | number | 0n | ''
export function isFalsy(value: unknown) {
  return !value
}

export function isOneOf<const T extends Tuple>(...set: T): (value: unknown) => value is T[number] {
  return (value: unknown): value is T[number] => new Set(set).has(value as any)
}

export function isNotOneOf<const T extends Tuple>(...set: T): <U>(value: U | T[number]) => value is U {
  return (value: unknown): value is T[number] => !new Set(set).has(value as any)
}

export function isInstanceOf<T extends abstract new (..._: any) => any>(
  value: unknown,
  ctor: T
): value is InstanceType<T> {
  return value instanceof ctor
}

export function isNotInstanceOf<T extends abstract new (..._: any) => any, U>(
  value: U,
  ctor: T
): value is Exclude<U, InstanceType<T>> {
  return !(value instanceof ctor)
}

export type Nominal<Base, Tag extends symbol> = Base & Record<Tag, never>

/**
 * Utility for defining tagged union types.
 * @example
 * DiscriminatedUnion<{ Rect: { width: number; height: number }; Circle: { radius: number } }>
 * is equivalent to
 * { type: 'Rect'; width: number; height: number } | { type: 'Circle'; radius: number }
 */
export type DiscriminatedUnion<T, K extends keyof T = keyof T> = K extends K ? { type: K } & T[K] : never

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
