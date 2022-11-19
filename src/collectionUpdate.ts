import { AccurateTuple, Tuple } from './Array'
import { newMap } from './Map'

export function push<T extends AccurateTuple, U extends AccurateTuple>(self: T, ...args: U): [...T, ...U]
export function push<T extends Tuple, U extends Tuple>(self: T, ...args: U): [...T, ...U]
export function push<T extends Tuple, U extends Tuple>(self: T, ...args: U): [...T, ...U] {
  return [...self, ...args]
}
export namespace push {
  export function Iterable<T, U extends AccurateTuple>(self: Iterable<T>, ...args: U): Iterable<T | U[number]>
  export function Iterable<T, U extends Tuple>(self: Iterable<T>, ...args: U): Iterable<T | U[number]>
  export function* Iterable<T, U extends Tuple>(self: Iterable<T>, ...args: U): Iterable<T | U[number]> {
    yield* self
    yield* args
  }
}

export function removeAt<T>(self: readonly T[], i: number): readonly T[] {
  const cloned = self.slice()
  cloned.splice(i, 1)
  return cloned
}

export function set<K, T>(self: ReadonlyMap<K, T>, key: K, value: T): ReadonlyMap<K, T> {
  const cloned = new Map(self)
  cloned.set(key, value)
  return cloned
}

export namespace update {
  export function Map<K, T>(self: ReadonlyMap<K, T>, key: K, f: (_: T | undefined) => T): ReadonlyMap<K, T> {
    const cloned = newMap(self)
    cloned.set(key, f(cloned.get(key)))
    return cloned
  }

  export namespace Map {
    export function mutable<K, T>(self: Map<K, T>, key: K, f: (_: T | undefined) => T): Map<K, T> {
      self.set(key, f(self.get(key)))
      return self
    }
  }
}
