import { Nominal } from './type'

declare const NON_EMPTY_MAP_TAG: unique symbol
export type NonEmptyMap<K, T> = Nominal<Map<K, T>, typeof NON_EMPTY_MAP_TAG>
export type ReadonlyNonEmptyMap<K, T> = Nominal<ReadonlyMap<K, T>, typeof NON_EMPTY_MAP_TAG>

/**
 * Wrapper function for the Map constructor.
 * Use to avoid name conflicts.
 */
export function newMap<K, T>(...args: ConstructorParameters<typeof Map<K, T>>) {
  return new Map(...args)
}

export function mapOf<H extends readonly [any, any], T extends readonly [any, any][]>(
  head: H,
  ...tail: T
): ReadonlyNonEmptyMap<H[0] | T[number][0], H[1] | T[number][1]>
export function mapOf<T extends readonly [any, any][]>(...args: T): ReadonlyMap<T[number][0], T[number][1]>
export function mapOf<T extends readonly [any, any][]>(...args: T): ReadonlyMap<T[number][0], T[number][1]> {
  return new Map(args)
}

export function set<K, T>(map: ReadonlyMap<K, T>, key: K, value: T): ReadonlyMap<K, T> {
  const cloned = new Map(map)
  cloned.set(key, value)
  return cloned
}

export function update<K, T>(map: ReadonlyMap<K, T>, key: K, f: (_: T | undefined) => T): ReadonlyMap<K, T> {
  const cloned = new Map(map)
  cloned.set(key, f(cloned.get(key)))
  return cloned
}
