import { tail } from './transform'

/** Function with improved type of Object.fromEntries. */
export function fromEntries<T extends readonly [any, any]>(entries: Iterable<T>): Record<T[0], T[1]> {
  return Object.fromEntries(entries) as any
}

export type NestedProperty<T, Ks extends readonly (keyof any)[]> = Ks extends []
  ? T
  : Ks extends readonly [infer H extends keyof T, ...infer R extends readonly (keyof any)[]]
  ? NestedProperty<T[H], R>
  : undefined

function getProperty<T, Ks extends readonly (keyof any)[]>(self: T, ...keys: Ks): NestedProperty<T, Ks> {
  if (keys.length === 0) return self as any

  if (keys[0] in self) {
    return getProperty(keys[0], ...tail(keys)) as any
  }
  return undefined as any
}
