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

export function take<T, N extends number>(self: Iterable<T>, n: N): LimitedSizeArray<N, T> {
  const result: T[] = []
  const iterator = self[Symbol.iterator]()
  for (let element = iterator.next(); !element.done && result.length < n; element = iterator.next()) {
    result.push(element.value)
  }
  iterator.return?.()
  return result as any
}
