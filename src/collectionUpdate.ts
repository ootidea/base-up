import type { FixedLengthArray } from './Array/FixedLengthArray'
import type { NonEmptyArray } from './Array/MinLengthArray'
import { isInIntegerRangeThrough, isInIntegerRangeUntil } from './all'
import type { Equals } from './typePredicate'

export function push<const T extends readonly unknown[], const U extends readonly unknown[]>(
  self: T,
  ...args: U
): [...T, ...U] {
  return [...self, ...args] as any
}
export function* pushIterable<T, const U extends readonly unknown[]>(
  self: Iterable<T>,
  ...args: U
): Iterable<T | U[number]> {
  yield* self
  yield* args
}

export function unshift<const T extends readonly unknown[], const U extends readonly unknown[]>(
  self: T,
  ...args: U
): [...U, ...T] {
  return [...args, ...self] as any
}
export function* unshiftIterable<T, const U extends readonly unknown[]>(
  self: Iterable<T>,
  ...args: U
): Iterable<T | U[number]> {
  yield* args
  yield* self
}

/**
 * @example
 * insertAt([0, 1, 2], 0, 9) returns [9, 0, 1, 2]
 * insertAt([0, 1, 2], 1, 9) returns [0, 9, 1, 2]
 * insertAt([0, 1, 2], 3, 9) returns [0, 1, 2, 9]
 * insertAt([0, 1, 2], 4, 9) returns [0, 1, 2]
 * insertAt([0, 1, 2], -1, 9) returns [0, 1, 2]
 * insertAt([0, 1, 2], 1, false, null) returns [0, false, null, 1, 2]
 */
export function insertAt<T, const U extends readonly unknown[]>(
  self: readonly T[],
  at: number,
  ...values: U
): NonEmptyArray<T | U[number]> {
  const cloned: (T | U[number])[] = [...self]
  if (isInIntegerRangeThrough(at, 0, self.length)) {
    cloned.splice(at, 0, ...values)
  }
  return cloned as any
}
export function* insertAtIterable<T, const U extends readonly unknown[]>(
  self: Iterable<T>,
  at: number,
  ...values: U
): Iterable<T | U[number]> {
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

export type RemoveAt<T extends readonly unknown[], N extends number> = Equals<T, any> extends true
  ? any[]
  : _RemoveAt<T, FixedLengthArray<N>>
export type _RemoveAt<
  T extends readonly unknown[],
  N extends readonly unknown[],
  Acc extends readonly unknown[] = [],
> = T extends readonly [infer H, ...infer L]
  ? N extends readonly [any, ...infer M]
    ? _RemoveAt<L, M, [...Acc, H]>
    : [...Acc, ...L]
  : [...Acc, ...T]

/**
 * @example
 * removeAt([0, 1, 2], 0) returns [1, 2]
 * removeAt([0, 1, 2], 1) returns [0, 2]
 * removeAt([0, 1, 2], 2) returns [0, 1]
 * removeAt([0, 1, 2], 3) returns [0, 1, 2]
 * removeAt([0, 1, 2], -1) returns [0, 1, 2]
 */
export function removeAt<const T extends readonly unknown[], N extends number>(self: T, i: N): RemoveAt<T, N> {
  const cloned = [...self]
  if (isInIntegerRangeUntil(i, 0, self.length)) {
    cloned.splice(i, 1)
  }
  return cloned as any
}
export function* removeAtIterable<T>(self: Iterable<T>, at: number): Iterable<T> {
  let i = 0
  for (const value of self) {
    if (i !== at) {
      yield value
    }
    ++i
  }
}

// TODO: support tuple
export function removeAll<T>(self: readonly T[], value: T): T[] {
  return self.filter((x) => x !== value)
}
export function* removeAllIterable<T>(self: Iterable<T>, value: T): Iterable<T> {
  for (const x of self) {
    if (x !== value) {
      yield value
    }
  }
}

// TODO: support tuple
export function remove<T>(self: readonly T[], value: T): T[] {
  const index = self.findIndex((x) => x !== value)
  const cloned = [...self]
  if (index === -1) return cloned
  cloned.splice(index, 1)
  return cloned
}
export function* removeIterable<T>(self: Iterable<T>, value: T): Iterable<T> {
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

/**
 * @example
 * removePrefix('ABCDE', 'AB') returns 'CDE'
 * removePrefix('ABCDE', 'ABCDE') returns ''
 * removePrefix('ABCDE', '123') returns 'ABCDE'
 * removePrefix('ABCDE', '') returns 'ABCDE'
 */
export function removePrefix(self: string, prefix: string): string {
  if (self.startsWith(prefix)) {
    return self.slice(prefix.length)
  }
  return self
}

/**
 * @example
 * removeSuffix('ABCDE', 'DE') returns 'ABC'
 * removeSuffix('ABCDE', 'ABCDE') returns ''
 * removeSuffix('ABCDE', '123') returns 'ABCDE'
 * removeSuffix('ABCDE', '') returns 'ABCDE'
 */
export function removeSuffix(self: string, suffix: string): string {
  if (self.endsWith(suffix)) {
    return self.slice(0, self.length - suffix.length)
  }
  return self
}

export function moveTo<T>(self: readonly T[], from: number, to: number): T[] {
  const cloned = [...self]
  if (isInIntegerRangeUntil(from, 0, self.length) && isInIntegerRangeUntil(to, 0, self.length)) {
    const [removed] = cloned.splice(from, 1)
    cloned.splice(to, 0, removed!)
  }
  return cloned
}
