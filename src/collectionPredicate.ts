import { ReadonlyNonEmptyArray } from './Array'

export function isEmpty<T>(self: ReadonlyNonEmptyArray<T>): false
export function isEmpty<T>(self: readonly T[]): self is []
export function isEmpty<T>(self: readonly T[]): self is [] {
  return self.length === 0
}

export function isNotEmpty<T>(self: ReadonlyNonEmptyArray<T>): true
export function isNotEmpty<T>(self: readonly T[]): self is ReadonlyNonEmptyArray<T>
export function isNotEmpty<T>(self: readonly T[]): self is ReadonlyNonEmptyArray<T> {
  return self.length > 0
}

export function every<F extends (value: T) => value is U, T, U extends T>(
  array: readonly T[],
  f: F
): array is readonly U[]
export function every<F extends (value: T) => boolean, T>(self: readonly T[], f: F): boolean
export function every<F extends (value: T) => boolean, T>(self: readonly T[], f: F): boolean {
  return self.every(f)
}
