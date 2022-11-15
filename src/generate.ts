import { AccurateTuple, FixedSizeArray, Tuple } from './Array'

/**
 * @example
 * Until<3> is equivalent to [0, 1, 2]
 * @example
 * Until<0> is equivalent to []
 * @example
 * Until<2 | 4> is equivalent to [0, 1] | [0, 1, 2, 3]
 * @example
 * Until<number> is equivalent to number[]
 */
export type Until<N extends number> = number extends N ? number[] : N extends N ? _Until<N> : never
type _Until<N extends number, Result extends AccurateTuple = []> = Result['length'] extends N
  ? Result
  : _Until<N, [...Result, Result['length']]>

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
export namespace until {
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
