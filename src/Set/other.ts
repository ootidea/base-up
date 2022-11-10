import { sortBy } from '../Array/order'
import { map as mapIterator } from '../Iterator/other'

export function map<T, U>(set: Set<T>, f: (_: T) => U): Set<U> {
  return new Set(mapIterator(set.values(), f))
}

export function union<T, U>(lhs: Set<T>, rhs: Set<U>): Set<T | U> {
  const cloned = new Set<T | U>(lhs)
  for (const value of rhs.values()) {
    cloned.add(value)
  }
  return cloned
}

export function intersection<T, U>(lhs: Set<T>, rhs: Set<U>): Set<T & U> {
  const result = new Set<T & U>()
  const [small, big] = sortBy([lhs, rhs], (set) => set.size)
  for (const value of small.values()) {
    if (big.has(value as any)) {
      result.add(value as any)
    }
  }
  return result
}
