import { NonEmptyArray, ReadonlyNonEmptyArray } from './Array/MinLengthArray'
import { Tuple } from './Array/other'
import { ReadonlyNonEmptyMap } from './Map'
import { ReadonlyNonEmptySet } from './Set'

export function isEmpty(self: []): true
export function isEmpty<T>(self: ReadonlyNonEmptyArray<T>): false
export function isEmpty<T>(self: readonly T[]): self is []
export function isEmpty<T>(self: readonly T[]): self is [] {
  return self.length === 0
}
export namespace isEmpty {
  export function Iterable<T>(self: Iterable<T>): boolean {
    for (const _ of self) {
      return false
    }
    return true
  }

  export function Set<T>(self: ReadonlyNonEmptySet<T>): false
  export function Set<T>(self: ReadonlySet<T>): boolean
  export function Set<T>(self: ReadonlySet<T>): boolean {
    return self.size === 0
  }

  export function object(self: object): boolean {
    return Object.keys(self).length === 0
  }

  export function Map<K, T>(self: ReadonlyNonEmptyMap<K, T>): false
  export function Map<K, T>(self: ReadonlyMap<K, T>): boolean
  export function Map<K, T>(self: ReadonlyMap<K, T>): boolean {
    return self.size === 0
  }
}

export function isNotEmpty(self: readonly []): false
export function isNotEmpty<T>(self: ReadonlyNonEmptyArray<T>): true
export function isNotEmpty<T>(self: T[]): self is NonEmptyArray<T>
export function isNotEmpty<T>(self: readonly T[]): self is ReadonlyNonEmptyArray<T>
export function isNotEmpty<T>(self: readonly T[]) {
  return self.length > 0
}
export namespace isNotEmpty {
  export function Iterable<T>(self: Iterable<T>): boolean {
    for (const _ of self) {
      return true
    }
    return false
  }

  export function Set<T>(self: ReadonlyNonEmptySet<T>): true
  export function Set<T>(self: ReadonlySet<T>): self is ReadonlyNonEmptySet<T>
  export function Set<T>(self: ReadonlySet<T>): self is ReadonlyNonEmptySet<T> {
    return self.size > 0
  }

  export function object(self: object): boolean {
    return Object.keys(self).length > 0
  }

  export function Map<K, T>(self: ReadonlyNonEmptyMap<K, T>): true
  export function Map<K, T>(self: ReadonlyMap<K, T>): self is ReadonlyNonEmptyMap<K, T>
  export function Map<K, T>(self: ReadonlyMap<K, T>): self is ReadonlyNonEmptyMap<K, T> {
    return self.size > 0
  }
}

export function every<T>(self: [], f: (value: T) => boolean): true
export function every<T, U extends T>(self: T[], f: (value: T) => value is U): self is U[]
export function every<T, U extends T>(self: readonly T[], f: (value: T) => value is U): self is readonly U[]
export function every<T>(self: readonly T[], f: (value: T) => boolean): boolean
export function every<T>(self: readonly T[], f: (value: T) => boolean): boolean {
  return self.every(f)
}
export namespace every {
  export function Iterable<T, U extends T>(self: Set<T>, f: (value: T) => value is U): self is Set<U>
  export function Iterable<T, U extends T>(self: ReadonlySet<T>, f: (value: T) => value is U): self is ReadonlySet<U>
  export function Iterable<T, U extends T>(self: Iterable<T>, f: (value: T) => value is U): self is Iterable<U>
  export function Iterable<T>(self: Iterable<T>, f: (value: T) => boolean): boolean
  export function Iterable<T>(self: Iterable<T>, f: (value: T) => boolean): boolean {
    for (const value of self) {
      if (!f(value)) return false
    }
    return true
  }
}

export namespace everyValues {
  export function Map<K, T, U extends T>(self: Map<K, T>, f: (value: T) => value is U): self is Map<K, U>
  export function Map<K, T, U extends T>(
    self: ReadonlyMap<K, T>,
    f: (value: T) => value is U
  ): self is ReadonlyMap<K, U>
  export function Map<K, T>(self: ReadonlyMap<K, T>, f: (value: T) => boolean): boolean
  export function Map<K, T>(self: ReadonlyMap<K, T>, f: (value: T) => boolean): boolean {
    return every.Iterable(self.values(), f)
  }
}

export function includes(self: [], value: unknown, fromIndex?: number | undefined): false
export function includes<const T extends Tuple>(
  self: T,
  value: unknown,
  fromIndex?: number | undefined
): value is T[number]
export function includes<const T extends Tuple>(
  self: T,
  value: unknown,
  fromIndex?: number | undefined
): value is T[number] {
  return self.includes(value as any, fromIndex)
}
export namespace includes {
  export function defer(value: unknown, fromIndex?: number | undefined) {
    function result(self: []): false
    function result<T extends Tuple>(self: T): boolean
    function result<T extends Tuple>(self: T) {
      return includes(self, value, fromIndex)
    }
    return result
  }

  export function Iterable<T>(self: Iterable<T>, value: unknown): value is T {
    for (const element of self) {
      if (element === value) return true
    }
    return false
  }
  export namespace Iterable {
    export function defer(value: unknown) {
      return <T>(self: Iterable<T>) => includes.Iterable(self, value)
    }
  }

  export function string(self: string, value: '', position?: number | undefined): true
  export function string(self: '', value: string, position?: number | undefined): false
  export function string(self: string, value: string, position?: number | undefined): boolean
  export function string(self: string, value: string, position?: number | undefined): boolean {
    return self.includes(value, position)
  }
  export namespace string {
    export function defer(value: '', position?: number | undefined): (self: string) => true
    export function defer(value: string, position?: number | undefined): { (self: ''): false; (self: string): boolean }
    export function defer(value: string, position?: number | undefined): (self: string) => boolean {
      return (self: string) => includes.string(self, value, position)
    }
  }
}

export function isUnique(self: [] | ''): true
export function isUnique<T>(self: Iterable<T>): boolean
export function isUnique<T>(self: Iterable<T>): boolean {
  const set = new Set<T>()
  for (const value of self) {
    if (set.has(value)) return false

    set.add(value)
  }
  return true
}
