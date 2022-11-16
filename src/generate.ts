import { AccurateTuple, FixedSizeArray, Tuple } from './Array'

/**
 * @example
 * RangeTo<3> is equivalent to [0, 1, 2]
 * @example
 * RangeTo<0> is equivalent to []
 * @example
 * RangeTo<2 | 4> is equivalent to [0, 1] | [0, 1, 2, 3]
 * @example
 * RangeTo<number> is equivalent to number[]
 */
export type RangeTo<N extends number> = number extends N ? number[] : N extends N ? _RangeTo<N> : never
type _RangeTo<N extends number, Result extends AccurateTuple = []> = Result['length'] extends N
  ? Result
  : _RangeTo<N, [...Result, Result['length']]>

/**
 * @example
 * Protruded<[any], [bigint, never, void]> is equivalent to [never, void]
 * Protruded<[bigint, never, void], [any]> is equivalent to [never, void]
 * Protruded<[any, any, any], [bigint, never, void]> is equivalent to []
 * Protruded<FixedSizeArray<1>, FixedSizeArray<4>>['length'] is equivalent to 3
 */
export type Protruded<T extends Tuple, U extends Tuple> = T extends [any, ...infer TL]
  ? U extends [any, ...infer UL]
    ? Protruded<TL, UL>
    : T
  : U extends [any, ...infer UL]
  ? U
  : []

/**
 * @example
 * rangeTo(3) results [0, 1, 2]
 * rangeTo(3) is typed as [0, 1, 2]
 * @example
 * rangeTo(0) results []
 * rangeTo(0) is typed as []
 * @example
 * const n: number = 4
 * rangeTo(n) results [0, 1, 2, 3]
 * rangeTo(n) is typed as readonly number[]
 */
export function rangeTo<N extends number>(length: N): RangeTo<N> {
  return Array.from({ length }, (_, i) => i) as any
}
export namespace rangeTo {
  export function* Iterable(n: number): Generator<number> {
    for (let i = 0; i < n; i++) {
      yield i
    }
  }
}

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

export function repeat<N extends number, T extends AccurateTuple>(count: N, ...values: T): RepeatArray<N, T> {
  return Array.from({ length: count * values.length }, (_, i) => values[i % values.length]) as any
}
export namespace repeat {
  /**
   * @example
   * repeat('a') yields 'a', 'a', 'a', ...
   * repeat(1, 2) yields 1, 2, 1, 2, ...
   */
  export function Iterable<T extends AccurateTuple>(...values: T): Generator<T[number], void, undefined>
  export function Iterable<T extends Tuple>(...values: T): Generator<T[number], void, undefined>
  export function* Iterable<T extends Tuple>(...values: T): Generator<T[number], void, undefined> {
    while (true) yield* values
  }
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
export namespace repeatApply {
  export function* Iterator<T>(first: T, f: (_: T) => T): Generator<T> {
    let value = first
    while (true) {
      yield value
      value = f(value)
    }
  }
}

/** Function with improved type of Object.fromEntries. */
export function fromEntries<T extends readonly [any, any]>(entries: Iterable<T>): Record<T[0], T[1]> {
  return Object.fromEntries(entries) as any
}
