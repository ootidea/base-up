import { ReadonlyNonEmptyArray } from './Array'
import { ReadonlyNonEmptyMap } from './Map'
import { ReadonlyNonEmptySet } from './Set'

export function isEmpty<T>(self: ReadonlyNonEmptyArray<T>): false
export function isEmpty<T>(self: readonly T[]): self is []
export function isEmpty<T>(self: readonly T[]): self is [] {
  return self.length === 0
}

export namespace isEmpty {
  export function Set<T>(set: ReadonlyNonEmptySet<T>): false
  export function Set<T>(set: ReadonlySet<T>): boolean
  export function Set<T>(set: ReadonlySet<T>): boolean {
    return set.size === 0
  }

  export function Map<K, T>(map: ReadonlyNonEmptyMap<K, T>): false
  export function Map<K, T>(map: ReadonlyMap<K, T>): boolean
  export function Map<K, T>(map: ReadonlyMap<K, T>): boolean {
    return map.size === 0
  }
}

export function isNotEmpty<T>(self: ReadonlyNonEmptyArray<T>): true
export function isNotEmpty<T>(self: readonly T[]): self is ReadonlyNonEmptyArray<T>
export function isNotEmpty<T>(self: readonly T[]): self is ReadonlyNonEmptyArray<T> {
  return self.length > 0
}

export namespace isNotEmpty {
  export function Set<T>(set: ReadonlyNonEmptySet<T>): true
  export function Set<T>(set: ReadonlySet<T>): set is ReadonlyNonEmptySet<T>
  export function Set<T>(set: ReadonlySet<T>): set is ReadonlyNonEmptySet<T> {
    return set.size > 0
  }

  export function Map<K, T>(map: ReadonlyNonEmptyMap<K, T>): true
  export function Map<K, T>(map: ReadonlyMap<K, T>): map is ReadonlyNonEmptyMap<K, T>
  export function Map<K, T>(map: ReadonlyMap<K, T>): map is ReadonlyNonEmptyMap<K, T> {
    return map.size > 0
  }
}

export function every<F extends (value: T) => value is U, T, U extends T>(
  array: readonly T[],
  f: F
): array is readonly U[]
export function every<F extends (value: T) => boolean, T>(self: readonly T[], f: F): boolean
export function every<F extends (value: T) => boolean, T>(self: readonly T[], f: F): boolean {
  return self.every(f)
}
