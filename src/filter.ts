import { ReadonlyNonEmptyArray } from './Array'
import { newSet } from './Set'

export function filter<T, U extends T>(self: readonly T[], f: (_: T) => _ is U): readonly U[]
export function filter<T>(self: readonly T[], f: (_: T) => boolean): readonly T[]
export function filter<T>(self: readonly T[], f: (_: T) => boolean): readonly T[] {
  return self.filter(f) as any
}

export namespace filter {
  export function Iterable<T, U extends T>(self: Iterable<T>, f: (_: T) => _ is U): Generator<U>
  export function Iterable<T>(self: Iterable<T>, f: (_: T) => boolean): Generator<T>
  export function* Iterable<T>(self: Iterable<T>, f: (_: T) => boolean): Generator<T> {
    for (const value of self) {
      if (f(value)) {
        yield value
      }
    }
  }

  export function Set<T, U extends T>(self: ReadonlySet<T>, f: (_: T) => _ is U): ReadonlySet<U>
  export function Set<T>(self: ReadonlySet<T>, f: (_: T) => boolean): ReadonlySet<T>
  export function Set<T>(self: ReadonlySet<T>, f: (_: T) => boolean): ReadonlySet<T> {
    return newSet(filter.Iterable(self.values(), f))
  }
}

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

export function maxBy<T>(self: ReadonlyNonEmptyArray<T>, by: (element: T) => number): T
export function maxBy<T>(self: readonly T[], by: (element: T) => number): T | undefined {
  if (self.length === 0) return undefined

  const [firstElement, ...rest] = self
  let candidateElement = firstElement
  let maxValue = by(firstElement)
  for (const element of rest) {
    const value = by(element)
    if (maxValue < value) {
      candidateElement = element
      maxValue = value
    }
  }
  return candidateElement
}

export function elementAt<T>(self: Iterable<T>, n: number): T | undefined {
  const iterator = self[Symbol.iterator]()
  let i: number
  let element: IteratorResult<T>
  for (i = 0, element = iterator.next(); i < n && !element.done; ++i, element = iterator.next()) {}
  iterator.return?.()
  return element.value
}
