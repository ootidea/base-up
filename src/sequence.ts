import { AccurateTuple, FixedSizeArray, LimitedSizeArray, ReadonlyNonEmptyArray, Tuple } from './Array'

/**
 * @example
 * Until<3> is equivalent to [0, 1, 2]
 * @example
 * Until<0> is equivalent to []
 * @example
 * Until<2 | 4> is equivalent to [0, 1] | [0, 1, 2, 3]
 * @example
 * Until<number> is equivalent to readonly number[]
 */
export type Until<N extends number> = number extends N ? readonly number[] : N extends N ? _Until<N> : never
type _Until<N extends number, Result extends AccurateTuple = []> = Result['length'] extends N
  ? Result
  : _Until<N, [...Result, Result['length']]>

/**
 * @example
 * RepeatArray<3, ['a', 'b']> is typed as ['a', 'b', 'a', 'b', 'a', 'b']
 * RepeatArray<0, ['a', 'b']> is typed as []
 * @example
 * RepeatArray<0 | 1, ['a', 'b']> is typed as [] | ['a', 'b']
 * RepeatArray<number, ['a', 'b']> is typed as readonly ('a' | 'b')[]
 */
export type RepeatArray<N extends number, A extends AccurateTuple> = number extends N
  ? readonly A[number][]
  : N extends N
  ? _RepeatArray<N, A>
  : never
type _RepeatArray<
  N extends number,
  A extends AccurateTuple,
  L extends AccurateTuple = [],
  R extends AccurateTuple = []
> = L['length'] extends N ? R : _RepeatArray<N, A, [...L, any], [...R, ...A]>

/**
 * @example
 * until(3) results [0, 1, 2]
 * until(3) is typed as [0, 1, 2]
 * @example
 * until(0) results []
 * until(0) is typed as []
 * @example
 * const n: number = 4
 * until(n) results [0, 1, 2, 3]
 * until(n) is typed as readonly number[]
 */
export function until<N extends number>(length: N): Until<N> {
  return Array.from({ length }, (_, i) => i) as any
}

export function repeat<N extends number, T extends AccurateTuple>(count: N, ...values: T): RepeatArray<N, T> {
  return Array.from({ length: count * values.length }, (_, i) => values[i % values.length]) as any
}

export function repeatApply<N extends number, T>(length: N, first: T, f: (_: T) => T): FixedSizeArray<N, T> {
  if (length === 0) return [] as any

  const result: T[] = [first]
  let value = first
  for (let i = 1; i < length; i++) {
    value = f(value)
    result.push(value)
  }
  return result as any
}

export function first<T>(self: ReadonlyNonEmptyArray<T>): T
export function first<T>(self: readonly T[]): T | undefined
export function first<T>(self: readonly T[]): T | undefined {
  return self[0]
}

export function last<T>(self: ReadonlyNonEmptyArray<T>): T
export function last<T>(self: readonly T[]): T | undefined
export function last<T>(self: readonly T[]): T | undefined {
  return self[self.length - 1]
}

export function take<T, N extends number>(self: Iterable<T>, n: N): LimitedSizeArray<N, T>
export function take<T>(self: Iterable<T>, n: number): readonly T[]
export function take<T>(self: Iterable<T>, n: number): readonly T[] {
  const result: T[] = []
  const iterator = self[Symbol.iterator]()
  for (let element = iterator.next(); !element.done && result.length < n; element = iterator.next()) {
    result.push(element.value)
  }
  iterator.return?.()
  return result as any
}

export function indexOf<T>(self: [], value: T, fromIndex?: number): undefined
export function indexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined
export function indexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined {
  const index = self.indexOf(value, fromIndex)
  if (index === -1) return undefined

  return index
}

export function lastIndexOf<T>(self: [], value: T, fromIndex?: number): undefined
export function lastIndexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined
export function lastIndexOf<T>(self: readonly T[], value: T, fromIndex?: number): number | undefined {
  const index = self.lastIndexOf(value, fromIndex)
  if (index === -1) return undefined

  return index
}

export function indexesOf<T>(self: [], value: T): []
export function indexesOf<T>(self: readonly T[], value: T): readonly number[]
export function indexesOf<T>(self: readonly T[], value: T): readonly number[] {
  const result = []
  for (let i = 0; i < self.length; i++) {
    if (self[i] === value) {
      result.push(i)
    }
  }
  return result
}

export function push<T extends AccurateTuple, U extends AccurateTuple>(self: T, ...args: U): [...T, ...U]
export function push<T extends Tuple, U extends Tuple>(self: T, ...args: U): [...T, ...U]
export function push<T extends Tuple, U extends Tuple>(self: T, ...args: U): [...T, ...U] {
  return [...self, ...args]
}

export function tail<T>(self: ReadonlyNonEmptyArray<T>): readonly T[]
export function tail<T>(self: readonly T[]): readonly T[] | undefined
export function tail<T>(self: readonly T[]): readonly T[] | undefined {
  if (self.length === 0) return undefined

  const cloned = self.slice()
  cloned.shift()
  return cloned
}

export function removeAt<T>(self: readonly T[], i: number): readonly T[] {
  const cloned = self.slice()
  cloned.splice(i, 1)
  return cloned
}
