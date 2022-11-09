import { map as mapIterator } from '../Iterator/other'

export function map<T, U>(set: Set<T>, f: (_: T) => U): Set<U> {
  return new Set(mapIterator(set.values(), f))
}
