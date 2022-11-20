import { AccurateTuple, NonEmptyArray, Tuple } from './Array'
import { newMap } from './Map'
import { mod } from './number'

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

export function unshift<T extends AccurateTuple, U extends AccurateTuple>(self: T, ...args: U): [...U, ...T]
export function unshift<T extends Tuple, U extends Tuple>(self: T, ...args: U): [...U, ...T]
export function unshift<T extends Tuple, U extends Tuple>(self: T, ...args: U): [...U, ...T] {
  return [...args, ...self]
}
export namespace unshift {
  export function Iterable<T, U extends AccurateTuple>(self: Iterable<T>, ...args: U): Iterable<T | U[number]>
  export function Iterable<T, U extends Tuple>(self: Iterable<T>, ...args: U): Iterable<T | U[number]>
  export function* Iterable<T, U extends Tuple>(self: Iterable<T>, ...args: U): Iterable<T | U[number]> {
    yield* args
    yield* self
  }
}

export function insertAt<T>(self: readonly T[], at: number, ...values: readonly T[]): NonEmptyArray<T> {
  const cloned = [...self]
  cloned.splice(mod(at, self.length + 1), 0, ...values)
  return cloned as any
}

export function removeAt<T>(self: readonly T[], i: number): readonly T[] {
  const cloned = [...self]
  cloned.splice(i, 1)
  return cloned
}

export function set<T, K extends keyof T>(self: T, key: K, value: T[K]): T
export function set<T, K extends keyof T, V>(self: T, key: K, value: V): Omit<T, K> & Record<K, V>
export function set<K extends keyof any>(self: any, key: K, value: unknown): any {
  const result = { ...self }
  result[key] = value
  return result
}
export namespace set {
  export function Map<K, T>(self: ReadonlyMap<K, T>, key: K, value: T): ReadonlyMap<K, T> {
    const cloned = newMap(self)
    cloned.set(key, value)
    return cloned
  }
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
