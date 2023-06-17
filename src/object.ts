import { isNotEmpty } from './collectionPredicate'
import { tail } from './transform'
import { Simplify } from './type'

export type NestedProperty<T, Ks extends readonly (keyof any)[]> = Ks extends []
  ? T
  : Ks extends readonly [infer H extends keyof T, ...infer R extends readonly (keyof any)[]]
  ? NestedProperty<T[H], R>
  : undefined

/**
 * @example
 * getNestedProperty({ a: 123 }, 'a') returns 123
 * getNestedProperty({ a: 123, b: { c: 'nested' } }, 'b', 'c') returns 'nested'
 * @example
 * getNestedProperty({ a: 123 }, 'z', 'x') returns undefined
 * @example Empty path
 * getNestedProperty({ a: 123 }) returns { a: 123 }
 */
export function getNestedProperty<T extends object, Ks extends readonly (keyof any)[]>(
  self: T,
  ...keys: Ks
): NestedProperty<T, Ks> {
  if (!isNotEmpty(keys)) return self as any

  const firstKey = keys[0]
  if (firstKey in self) {
    return getNestedProperty((self as any)[firstKey], ...tail(keys)) as any
  }
  return undefined as any
}

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

/**
 * @example
 * RequiredKeysOf<{ a: 1; b?: 2; c: 3 }> is equivalent to 'a' | 'c'
 * RequiredKeysOf<{ value: string; 0: boolean }> is equivalent to 'value' | 0
 * RequiredKeysOf<{ a?: 1 }> is equivalent to never
 * @example
 * RequiredKeysOf<[0, 1?, 2?]> is equivalent to '0' | keyof []
 */
export type RequiredKeysOf<T> = keyof T extends infer K extends keyof T
  ? K extends K
    ? T extends Record<K, any>
      ? K
      : never
    : never
  : never

/**
 * @example
 * OptionalKeysOf<{ a: 1; b?: 2; c: 3 }> is equivalent to 'b'
 * OptionalKeysOf<{ value?: string; 0?: boolean }> is equivalent to 'value' | 0
 * OptionalKeysOf<{ a: 1 }> is equivalent to never
 * @example Optional elements of a tuple
 * OptionalKeysOf<[0, 1?, 2?]> is equivalent to '1' | '2'
 */
export type OptionalKeysOf<T> = keyof T extends infer K extends keyof T
  ? K extends K
    ? T extends Record<K, any>
      ? never
      : K
    : never
  : never

/**
 * @example
 * AtLeastOneProperty<{ a: 1; b?: 2; c: 3 }> is equivalent to { a: 1; b?: 2; c?: 3 } | { a?: 1; b?: 2; c: 3 }
 * AtLeastOneProperty<{ a: 1; b?: 2 }> is equivalent to { a: 1; b?: 2 }
 * AtLeastOneProperty<{ b?: 2 }> is equivalent to never
 * AtLeastOneProperty<{}> is equivalent to never
 */
export type AtLeastOneProperty<T> = Simplify<Partial<T> & { [K in RequiredKeysOf<T>]: Pick<T, K> }[RequiredKeysOf<T>]>
