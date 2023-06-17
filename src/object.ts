import { isNotEmpty } from './collectionPredicate'
import { tail } from './transform'

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
