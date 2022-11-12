/**
 * All lowercase types that exist in TypeScript, excluding unknown and any.
 * T | never is equivalent to T, so never is omitted.
 *
 * This helps to infer literal types as follows.
 * @example
 * function success<T extends readonly PseudoAny[]>(...args: T): T { return args }
 * function failures<T extends readonly any[]>(...args: T): T { return args }
 * success(1, 'a') is typed as [1, 'a']
 * failures(1, 'a') is typed as [number, string]
 */
export type PseudoAny = null | undefined | void | boolean | number | bigint | string | symbol | object

export type AccurateTuple = readonly PseudoAny[]

export function assert<T, U extends T>(value: T, predicate: (value: T) => value is U): asserts value is U
export function assert<T>(value: T, predicate: (value: T) => boolean): void
export function assert<T>(value: T, predicate: (value: T) => boolean) {
  if (predicate(value)) {
    throw new Error()
  }
}

export function assertEquals<T extends PseudoAny, U extends T>(lhs: T, rhs: U): asserts lhs is U
export function assertEquals<T extends U, U extends PseudoAny>(lhs: T, rhs: U): asserts rhs is T
export function assertEquals<T, U>(lhs: T, rhs: U) {
  if (lhs !== (rhs as any)) {
    throw new Error()
  }
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

export function isInstanceOf<T extends abstract new (..._: any) => any>(
  ctor: T,
  value: unknown
): value is InstanceType<T> {
  return value instanceof ctor
}

export function isNotInstanceOf<T extends abstract new (..._: any) => any, U>(
  ctor: T,
  value: U | InstanceType<T>
): value is U {
  return !(value instanceof ctor)
}

export type Nominal<Base, Tag extends symbol> = Base & Record<Tag, never>
