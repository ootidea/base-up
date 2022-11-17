import { ReadonlyNonEmptyArray } from './Array'
import { update } from './collectionUpdate'
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

export function takeWhile<T, U extends T>(self: readonly T[], f: (_: T) => _ is U): U[]
export function takeWhile<T>(self: readonly T[], f: (_: T) => boolean): T[]
export function takeWhile<T>(self: readonly T[], f: (_: T) => boolean): T[] {
  const result = []
  for (const value of self) {
    if (!f(value)) return result

    result.push(value)
  }
  return result
}
export namespace takeWhile {
  export function Iterable<T, U extends T>(self: Iterable<T>, f: (_: T) => _ is U): Iterable<U>
  export function Iterable<T>(self: Iterable<T>, f: (_: T) => boolean): Iterable<T>
  export function* Iterable<T>(self: Iterable<T>, f: (_: T) => boolean): Iterable<T> {
    for (const value of self) {
      if (!f(value)) return

      yield value
    }
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
export function maxBy<T>(self: readonly T[], by: (element: T) => number): T | undefined
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

export function minBy<T>(self: ReadonlyNonEmptyArray<T>, by: (element: T) => number): T
export function minBy<T>(self: readonly T[], by: (element: T) => number): T | undefined
export function minBy<T>(self: readonly T[], by: (element: T) => number): T | undefined {
  if (self.length === 0) return undefined

  const [firstElement, ...rest] = self
  let candidateElement = firstElement
  let minValue = by(firstElement)
  for (const element of rest) {
    const value = by(element)
    if (minValue > value) {
      candidateElement = element
      minValue = value
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

export function findMode<T>(self: readonly T[]): T | undefined {
  const map = new Map<T, number>()
  let maxCount = 0
  let candidateValue: T | undefined = undefined
  for (const value of self) {
    update.Map.mutable(map, value, (prev) => {
      const nextCount = (prev ?? 0) + 1
      if (maxCount < nextCount) {
        maxCount = nextCount
        candidateValue = value
      }
      return nextCount
    })
  }
  return candidateValue
}

export function findModeBy<T, U>(self: readonly T[], by: (_: T) => U): T | undefined {
  const map = new Map<U, number>()
  let maxCount = 0
  let candidateValue: T | undefined = undefined
  for (const value of self) {
    update.Map.mutable(map, by(value), (prev) => {
      const nextCount = (prev ?? 0) + 1
      if (maxCount < nextCount) {
        maxCount = nextCount
        candidateValue = value
      }
      return nextCount
    })
  }
  return candidateValue
}
