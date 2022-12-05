import { Nominal } from './type'

declare const NON_EMPTY_MAP_TAG: unique symbol
export type NonEmptyMap<K, T> = Nominal<Map<K, T>, typeof NON_EMPTY_MAP_TAG>
export type ReadonlyNonEmptyMap<K, T> = Nominal<ReadonlyMap<K, T>, typeof NON_EMPTY_MAP_TAG>

/**
 * Wrapper function for the Map constructor.
 * Use to avoid name conflicts.
 */
export function newMap<K, T>(...args: ConstructorParameters<typeof Map<K, T>>): Map<K, T> {
  return new Map(...args)
}

export function mapOf<H extends readonly [any, any], T extends readonly [any, any][]>(
  head: H,
  ...tail: T
): NonEmptyMap<H[0] | T[number][0], H[1] | T[number][1]>
export function mapOf<T extends readonly [any, any][]>(...args: T): Map<T[number][0], T[number][1]>
export function mapOf<T extends readonly [any, any][]>(...args: T): Map<T[number][0], T[number][1]> {
  return new Map(args)
}
