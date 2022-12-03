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

export function insertAt<T, U extends Tuple>(
  self: readonly T[],
  at: number,
  ...values: U
): NonEmptyArray<T | U[number]> {
  const cloned: (T | U[number])[] = [...self]
  cloned.splice(mod(at, self.length + 1), 0, ...values)
  return cloned as any
}
export namespace insertAt {
  export function* Iterable<T, U extends Tuple>(self: Iterable<T>, at: number, ...values: U): Iterable<T | U[number]> {
    if (at === 0) {
      yield* values
    }

    let i = 1
    for (const value of self) {
      yield value
      if (i === at) {
        yield* values
      }
      i++
    }
  }
}

export function removeAt<T>(self: readonly T[], i: number): readonly T[] {
  const cloned = [...self]
  cloned.splice(i, 1)
  return cloned
}
export namespace removeAt {
  export function* Iterable<T>(self: Iterable<T>, at: number): Iterable<T> {
    let i = 0
    for (const value of self) {
      if (i !== at) {
        yield value
      }
      ++i
    }
  }
}

export function removeAll<T>(self: readonly T[], value: T): T[] {
  return self.filter((x) => x !== value)
}
export namespace removeAll {
  export function* Iterable<T>(self: Iterable<T>, value: T): Iterable<T> {
    for (const x of self) {
      if (x !== value) {
        yield value
      }
    }
  }
}

export function remove<T>(self: readonly T[], value: T): T[] {
  const index = self.findIndex((x) => x !== value)
  const cloned = [...self]
  if (index === -1) return cloned
  cloned.splice(index, 1)
  return cloned
}
export namespace remove {
  export function* Iterable<T>(self: Iterable<T>, value: T): Iterable<T> {
    const iterator = self[Symbol.iterator]()
    let element = iterator.next()
    // Yields until the given value is found.
    while (!element.done && element.value !== value) {
      yield element.value
      element = iterator.next()
    }

    // Yields all subsequent values.
    element = iterator.next()
    while (!element.done) {
      yield element.value
      element = iterator.next()
    }

    iterator.return?.()
  }
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
