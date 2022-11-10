import { sortBy } from '../Array/order'
import { map as mapIterator } from '../Iterator/other'

export function map<T, U>(set: ReadonlySet<T>, f: (_: T) => U): ReadonlySet<U> {
  return new Set(mapIterator(set.values(), f))
}

export function union<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): ReadonlySet<T | U> {
  const cloned = new Set<T | U>(lhs)
  for (const value of rhs.values()) {
    cloned.add(value)
  }
  return cloned
}

export function intersection<T, U>(lhs: ReadonlySet<T>, rhs: ReadonlySet<U>): ReadonlySet<T & U> {
  const result = new Set<T & U>()
  const [small, big] = sortBy([lhs, rhs], (set) => set.size)
  for (const value of small.values()) {
    if (big.has(value as any)) {
      result.add(value as any)
    }
  }
  return result
}
