import { ReadonlyNonEmptyArray } from '../Array'
import { id } from '../Function'
import { randomIntegerUntil } from '../number'
import { ltToComparator } from '../order'

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

export function sort<T>(self: []): []
export function sort<T>(self: readonly [T]): readonly [T]
export function sort<T>(self: ReadonlyNonEmptyArray<T>): ReadonlyNonEmptyArray<T>
export function sort<T>(self: readonly T[]): readonly T[]
export function sort<T>(self: readonly T[]): readonly T[] {
  return sortBy(self, id)
}

export function sortBy<T, U>(self: [], by: (_: T) => U): []
export function sortBy<T, U>(self: readonly [T], by: (_: T) => U): readonly [T]
export function sortBy<T, U>(self: ReadonlyNonEmptyArray<T>, by: (_: T) => U): ReadonlyNonEmptyArray<T>
export function sortBy<T, U>(self: readonly T[], by: (_: T) => U): readonly T[]
export function sortBy<T, U>(self: readonly T[], by: (_: T) => U): readonly T[] {
  const cloned = self.slice()
  cloned.sort(ltToComparator((lhs, rhs) => by(lhs) < by(rhs)))
  return cloned
}

export function shuffle<T>(self: []): []
export function shuffle<T>(self: readonly [T]): readonly [T]
export function shuffle<T>(self: ReadonlyNonEmptyArray<T>): ReadonlyNonEmptyArray<T>
export function shuffle<T>(self: readonly T[]): readonly T[]
export function shuffle<T>(self: readonly T[]): readonly T[] {
  const result: T[] = []
  for (let i = 0; i < self.length; ++i) {
    const j = randomIntegerUntil(i + 1)
    if (j < i) {
      result.push(result[j])
    }
    result[j] = self[i]
  }
  return result
}
