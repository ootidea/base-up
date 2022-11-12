import { LimitedSizeArray, ReadonlyNonEmptyArray } from './type'

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

export function take<T, N extends number>(self: Iterable<T>, n: N): LimitedSizeArray<N, T>
export function take<T>(self: Iterable<T>, n: number): readonly T[]
export function take<T>(self: Iterable<T>): LimitedSizeArray<1, T>
export function take<T>(self: Iterable<T>, n: number = 1): readonly T[] {
  const result: T[] = []
  const iterator = self[Symbol.iterator]()
  for (let element = iterator.next(); !element.done && result.length < n; element = iterator.next()) {
    result.push(element.value)
  }
  iterator.return?.()
  return result as any
}

export function indexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined {
  const index = self.indexOf(value, fromIndex)
  if (index === -1) return undefined

  return index
}

export function lastIndexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined {
  const index = self.lastIndexOf(value, fromIndex)
  if (index === -1) return undefined

  return index
}
