import type { NonEmptyArray, ReadonlyNonEmptyArray } from './Array/MinLengthArray'
import type { NonEmptyMap, ReadonlyNonEmptyMap } from './Map'
import type { NonEmptySet, ReadonlyNonEmptySet } from './Set'

export function isEmpty(self: readonly []): true
export function isEmpty(self: readonly never[]): true
export function isEmpty<T>(self: ReadonlyNonEmptyArray<T>): false
export function isEmpty<T>(self: T[]): self is []
export function isEmpty<T>(self: readonly T[]): self is readonly []
export function isEmpty(self: ReadonlySet<never>): true
export function isEmpty<T>(self: ReadonlyNonEmptySet<T>): false
export function isEmpty<K>(self: ReadonlyMap<K, never>): true
export function isEmpty<K, T>(self: ReadonlyNonEmptyMap<K, T>): false
export function isEmpty(self: ''): true
export function isEmpty(self: string): self is ''
export function isEmpty<T>(self: Iterable<T>): boolean
export function isEmpty<T>(self: Iterable<T>): boolean {
  for (const _ of self) {
    return false
  }
  return true
}

export function isNotEmpty(self: readonly []): false
export function isNotEmpty(self: readonly never[]): false
export function isNotEmpty<T>(self: ReadonlyNonEmptyArray<T>): true
export function isNotEmpty<T>(self: T[]): self is NonEmptyArray<T>
export function isNotEmpty<T>(self: readonly T[]): self is ReadonlyNonEmptyArray<T>
export function isNotEmpty(self: ReadonlySet<never>): false
export function isNotEmpty<T>(self: ReadonlyNonEmptySet<T>): true
export function isNotEmpty<T>(self: Set<T>): self is NonEmptySet<T>
export function isNotEmpty<T>(self: ReadonlySet<T>): self is ReadonlyNonEmptySet<T>
export function isNotEmpty<K>(self: ReadonlyMap<K, never>): true
export function isNotEmpty<K, T>(self: ReadonlyNonEmptyMap<K, T>): false
export function isNotEmpty<K, T>(self: Map<K, T>): self is NonEmptyMap<K, T>
export function isNotEmpty<K, T>(self: ReadonlyMap<K, T>): self is ReadonlyNonEmptyMap<K, T>
export function isNotEmpty(self: ''): false
export function isNotEmpty<T>(self: Iterable<T>): boolean
export function isNotEmpty<T>(self: Iterable<T>): boolean {
  for (const _ of self) {
    return true
  }
  return false
}

export function every<T>(self: readonly [], f: (value: T) => boolean): true
export function every<T, U extends T>(self: T[], f: (value: T) => value is U): self is U[]
export function every<T, U extends T>(self: readonly T[], f: (value: T) => value is U): self is readonly U[]
export function every<T>(self: readonly T[], f: (value: T) => boolean): boolean
export function every<T>(self: readonly T[], f: (value: T) => boolean): boolean {
  return self.every(f)
}
export function everyIterable<T, U extends T>(self: Set<T>, f: (value: T) => value is U): self is Set<U>
export function everyIterable<T, U extends T>(self: ReadonlySet<T>, f: (value: T) => value is U): self is ReadonlySet<U>
export function everyIterable<T, U extends T>(self: Iterable<T>, f: (value: T) => value is U): self is Iterable<U>
export function everyIterable<T>(self: Iterable<T>, f: (value: T) => boolean): boolean
export function everyIterable<T>(self: Iterable<T>, f: (value: T) => boolean): boolean {
  for (const value of self) {
    if (!f(value)) return false
  }
  return true
}

export function everyValuesMap<K, T, U extends T>(self: Map<K, T>, f: (value: T) => value is U): self is Map<K, U>
export function everyValuesMap<K, T, U extends T>(
  self: ReadonlyMap<K, T>,
  f: (value: T) => value is U,
): self is ReadonlyMap<K, U>
export function everyValuesMap<K, T>(self: ReadonlyMap<K, T>, f: (value: T) => boolean): boolean
export function everyValuesMap<K, T>(self: ReadonlyMap<K, T>, f: (value: T) => boolean): boolean {
  return everyIterable(self.values(), f)
}

export function includes(self: readonly [], value: unknown, fromIndex?: number | undefined): false
export function includes<const T extends readonly unknown[]>(
  self: T,
  value: unknown,
  fromIndex?: number | undefined,
): value is T[number]
export function includes<const T extends readonly unknown[]>(
  self: T,
  value: unknown,
  fromIndex?: number | undefined,
): value is T[number] {
  return self.includes(value as any, fromIndex)
}
export function includesDefer(value: unknown, fromIndex?: number | undefined) {
  function result(self: readonly []): false
  function result<T extends readonly unknown[]>(self: T): boolean
  function result<T extends readonly unknown[]>(self: T) {
    return includes(self, value, fromIndex)
  }
  return result
}
export function includesIterable<T>(self: Iterable<T>, value: unknown): value is T {
  for (const element of self) {
    if (element === value) return true
  }
  return false
}
export function includesIterableDefer(value: unknown) {
  return <T>(self: Iterable<T>) => includesIterable(self, value)
}
export function includesString(self: string, value: '', position?: number | undefined): true
export function includesString(self: '', value: string, position?: number | undefined): false
export function includesString(self: string, value: string, position?: number | undefined): boolean
export function includesString(self: string, value: string, position?: number | undefined): boolean {
  return self.includes(value, position)
}
export function includesStringDefer(value: '', position?: number | undefined): (self: string) => true
export function includesStringDefer(
  value: string,
  position?: number | undefined,
): { (self: ''): false; (self: string): boolean }
export function includesStringDefer(value: string, position?: number | undefined): (self: string) => boolean {
  return (self: string) => includesString(self, value, position)
}

export function isUnique(self: readonly [] | ''): true
export function isUnique<T>(self: Iterable<T>): boolean
export function isUnique<T>(self: Iterable<T>): boolean {
  const set = new Set<T>()
  for (const value of self) {
    if (set.has(value)) return false

    set.add(value)
  }
  return true
}
