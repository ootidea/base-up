import { ReadonlyNonEmptyArray } from './type'

export function first<T>(array: ReadonlyNonEmptyArray<T>): T
export function first<T>(array: readonly T[]): T | undefined
export function first<T>(array: readonly T[]): T | undefined {
  return array[0]
}

export function last<T>(array: ReadonlyNonEmptyArray<T>): T
export function last<T>(array: readonly T[]): T | undefined
export function last<T>(array: readonly T[]): T | undefined {
  return array[array.length - 1]
}

export function map<T, U>(self: ReadonlyNonEmptyArray<T>, f: (_: T) => U): ReadonlyNonEmptyArray<U>
export function map<T, U>(self: readonly T[], f: (_: T) => U): readonly U[]
export function map<T, U>(self: readonly T[], f: (_: T) => U): readonly U[] {
  return self.map(f)
}

export function filter<T, U extends T>(array: readonly T[], f: (_: T) => _ is U): readonly U[]
export function filter<T>(array: readonly T[], f: (_: T) => boolean): readonly T[]
export function filter<T>(array: readonly T[], f: (_: T) => boolean): readonly T[] {
  return array.filter(f) as any
}
