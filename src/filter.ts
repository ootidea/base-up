import { newSet } from './Set'

export function filter<T, U extends T>(self: readonly T[], f: (_: T) => _ is U): readonly U[]
export function filter<T>(self: readonly T[], f: (_: T) => boolean): readonly T[]
export function filter<T>(self: readonly T[], f: (_: T) => boolean): readonly T[] {
  return self.filter(f) as any
}

export namespace filter {
  export function Iterable<T, U extends T>(self: Iterable<T>, f: (_: T) => _ is U): Generator<U>
  export function Iterable<T>(self: Iterable<T>, f: (_: T) => boolean): Generator<T>
  export function* Iterable<T>(self: Iterable<T>, f: (_: T) => boolean): Generator<T> {
    for (const value of self) {
      if (f(value)) {
        yield value
      }
    }
  }

  export function Set<T, U extends T>(set: ReadonlySet<T>, f: (_: T) => _ is U): ReadonlySet<U>
  export function Set<T>(set: ReadonlySet<T>, f: (_: T) => boolean): ReadonlySet<T>
  export function Set<T>(set: ReadonlySet<T>, f: (_: T) => boolean): ReadonlySet<T> {
    return newSet(filter.Iterable(set.values(), f))
  }
}
