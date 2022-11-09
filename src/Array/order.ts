import { ltoetToComparator } from '../other'
import { ReadonlyNonEmptyArray } from './type'

export function maxBy<T>(array: ReadonlyNonEmptyArray<T>, by: (element: T) => number): T
export function maxBy<T>(array: readonly T[], by: (element: T) => number): T | undefined {
  if (array.length === 0) return undefined

  const [firstElement, ...rest] = array
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

export function sortBy<T, U>(array: ReadonlyNonEmptyArray<T>, by: (_: T) => U): ReadonlyNonEmptyArray<T>
export function sortBy<T, U>(array: readonly T[], by: (_: T) => U): readonly T[]
export function sortBy<T, U>(array: readonly T[], by: (_: T) => U): readonly T[] {
  const cloned = array.slice()
  cloned.sort(ltoetToComparator((lhs, rhs) => lhs <= rhs))
  return cloned
}
