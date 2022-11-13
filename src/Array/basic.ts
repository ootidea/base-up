import { LimitedSizeArray, ReadonlyNonEmptyArray } from '../Array'

export function first<T>(self: ReadonlyNonEmptyArray<T>): T
export function first<T>(self: readonly T[]): T | undefined
export function first<T>(self: readonly T[]): T | undefined {
  return self[0]
}

export function last<T>(self: ReadonlyNonEmptyArray<T>): T
export function last<T>(self: readonly T[]): T | undefined
export function last<T>(self: readonly T[]): T | undefined {
  return self[self.length - 1]
}

export function filter<T, U extends T>(self: readonly T[], f: (_: T) => _ is U): readonly U[]
export function filter<T>(self: readonly T[], f: (_: T) => boolean): readonly T[]
export function filter<T>(self: readonly T[], f: (_: T) => boolean): readonly T[] {
  return self.filter(f) as any
}

export function take<T, N extends number>(self: Iterable<T>, n: N): LimitedSizeArray<N, T>
export function take<T>(self: Iterable<T>, n: number): readonly T[]
export function take<T>(self: Iterable<T>, n: number): readonly T[] {
  const result: T[] = []
  const iterator = self[Symbol.iterator]()
  for (let element = iterator.next(); !element.done && result.length < n; element = iterator.next()) {
    result.push(element.value)
  }
  iterator.return?.()
  return result as any
}

export function indexOf<T>(self: [], value: T, fromIndex?: number): undefined
export function indexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined
export function indexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined {
  const index = self.indexOf(value, fromIndex)
  if (index === -1) return undefined

  return index
}

export function lastIndexOf<T>(self: [], value: T, fromIndex?: number): undefined
export function lastIndexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined
export function lastIndexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined {
  const index = self.lastIndexOf(value, fromIndex)
  if (index === -1) return undefined

  return index
}

export function indexesOf<T>(self: [], value: T): []
export function indexesOf<T>(self: readonly T[], value: T): readonly number[]
export function indexesOf<T>(self: readonly T[], value: T): readonly number[] {
  const result = []
  for (let i = 0; i < self.length; i++) {
    if (self[i] === value) {
      result.push(i)
    }
  }
  return result
}
