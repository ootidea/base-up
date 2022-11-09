import { map as mapIterator } from '../Iterator/other'

export function map<T, U>(set: Set<T>, f: (_: T) => U): Set<U> {
  return new Set(mapIterator(set.values(), f))
}

export function union<T>(lhs: Set<T>, rhs: Set<T>): Set<T> {
  const cloned = new Set(lhs)
  for (const value of rhs.values()) {
    cloned.add(value)
  }
  return cloned
}
