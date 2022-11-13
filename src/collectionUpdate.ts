import { AccurateTuple, Tuple } from './Array'

export function push<T extends AccurateTuple, U extends AccurateTuple>(self: T, ...args: U): [...T, ...U]
export function push<T extends Tuple, U extends Tuple>(self: T, ...args: U): [...T, ...U]
export function push<T extends Tuple, U extends Tuple>(self: T, ...args: U): [...T, ...U] {
  return [...self, ...args]
}

export function removeAt<T>(self: readonly T[], i: number): readonly T[] {
  const cloned = self.slice()
  cloned.splice(i, 1)
  return cloned
}

export function update<K, T>(self: Map<K, T>, key: K, f: (_: T | undefined) => T): Map<K, T> {
  self.set(key, f(self.get(key)))
  return self
}
