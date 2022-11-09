export function assert<T, U extends T>(value: T, predicate: (value: T) => value is U): asserts value is U
export function assert<T>(value: T, predicate: (value: T) => boolean): void | never
export function assert<T>(value: T, predicate: (value: T) => boolean): void | never {
  if (predicate(value)) {
    throw new Error()
  }
}

/**
 * Generate a function with Type predicate that checks for equality with the given value.
 * @example As an equivalence function
 * isJust(123)(456) results false
 * isJust(null)(null) results true
 * @example As a type guard function
 * let n = 123
 * assert(n, isJust(456)) will throw an exception.
 * assert(n, isJust(123 as const)) will narrow the type of n to 123.
 */
export const isJust =
  <T, U extends T>(literal: U) =>
  (value: T): value is U =>
    value === literal
