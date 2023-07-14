import { Tuple } from './Array/other'
import { nullish } from './type'

/**
 * Determines whether the types are strictly the same or not.
 * This was implemented with reference to: {@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650}
 * @example
 * Equals<123, 123> equals true
 * Equals<123, 456> equals false
 * Equals<123, number> equals false
 * Equals<void, undefined> equals false
 * Equals<any, unknown> equals false
 * Equals<never, any> equals false
 * @example
 * Equals<'a' | 'b', 'b' | 'a'> equals true
 * Equals<1, 1 | never> equals true
 * Equals<boolean, true | false> equals true
 * @example
 * Equals<string & {}, string> equals false
 * Equals<string & {}, {}> equals false
 * @example
 * Equals<[a: string], [b: string]> equals true
 * Equals<[string?], [] | [string]> equals false
 * @example
 * Equals<{}, {}> equals true
 */
export type Equals<T, U, Then = true, Else = false> = (<R>() => R extends T ? 1 : 2) extends <R>() => R extends U
  ? 1
  : 2
  ? Then
  : Else

export function equals<const T, const U extends T>(self: T, other: U): self is U
export function equals<const T extends U, const U>(self: T, other: U): other is T
export function equals<const T, const U>(self: T, other: U): false
export function equals(self: unknown, other: unknown) {
  return self === other
}
export namespace equals {
  export function defer<const T>(other: T): (self: unknown) => self is T {
    return (self: unknown): self is T => self === other
  }
}

/**
 * Determines whether the type is one of the types in the tuple.
 * @example
 * IsOneOf<string, [string, number, bigint]> equals true
 * IsOneOf<string, [number, bigint]> equals false
 * IsOneOf<string, [any, unknown, never]> equals false
 * IsOneOf<string, [string | number]> equals false
 * IsOneOf<'text', [string]> equals false
 * IsOneOf<any, []> equals false
 */
export type IsOneOf<T, U extends Tuple, Then = true, Else = false> = U extends readonly [infer H, ...infer L]
  ? Equals<T, H> extends true
    ? Then
    : IsOneOf<T, L, Then, Else>
  : Else

export function isOneOf<const T extends Tuple>(self: unknown, ...values: T): self is T[number] {
  return new Set(values).has(self)
}
export namespace isOneOf {
  export function defer<const T extends Tuple>(...values: T): (self: unknown) => self is T[number] {
    return (self: unknown): self is T[number] => new Set(values).has(self)
  }
}

export function isNotOneOf<const T extends Tuple, const U>(
  self: T[number] | U,
  ...values: T
): self is Exclude<U, T[number]> {
  return !new Set(values).has(self)
}
export namespace isNotOneOf {
  export function defer<const T extends Tuple>(
    ...values: T
  ): <const U>(self: T[number] | U) => self is Exclude<U, T[number]> {
    return <const U>(self: T[number] | U): self is Exclude<U, T[number]> => !new Set(values).has(self)
  }
}

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

export function isInstanceOf<T extends abstract new (..._: any) => any>(
  value: unknown,
  ctor: T
): value is InstanceType<T> {
  return value instanceof ctor
}
export namespace isInstanceOf {
  /**
   * isInstanceOf.defer(Class)(value) equals isInstanceOf(value, Class).
   * @example
   * isInstanceOf.defer(RegExp)(/a/) returns true
   */
  export function defer<T extends abstract new (..._: any) => any>(ctor: T) {
    return (value: unknown): value is InstanceType<T> => value instanceof ctor
  }
}

export function isNotInstanceOf<T extends abstract new (..._: any) => any, U>(
  value: U,
  ctor: T
): value is Exclude<U, InstanceType<T>> {
  return !(value instanceof ctor)
}
