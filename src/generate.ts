import { FixedSizeArray, OrMoreSizeArray, Tuple } from './Array'
import { Decrement, Increment } from './number'

/**
 * @example
 * RangeUntil<3> is equivalent to [0, 1, 2]
 * @example
 * RangeUntil<0> is equivalent to []
 * @example
 * RangeUntil<2 | 4> is equivalent to [0, 1] | [0, 1, 2, 3]
 * @example
 * RangeUntil<number> is equivalent to number[]
 */
export type RangeUntil<From extends number, To extends number | undefined = undefined> = To extends number
  ? number extends From
    ? number[]
    : number extends To
    ? number[]
    : From extends From
    ? To extends To
      ? `${From}` extends `-${infer PN extends number}`
        ? `${To}` extends `-${infer PM extends number}`
          ? OrMoreSizeArray<PN> extends OrMoreSizeArray<PM>
            ? IncrementsUntil<From, To>
            : DecrementsUntil<From, To>
          : IncrementsUntil<From, To>
        : `${To}` extends `-${infer PM extends number}`
        ? DecrementsUntil<From, To>
        : OrMoreSizeArray<From> extends OrMoreSizeArray<To>
        ? DecrementsUntil<From, To>
        : IncrementsUntil<From, To>
      : never
    : never
  : RangeUntil<0, From>
type IncrementsUntil<N extends number, M extends number, Result extends Tuple = []> = M extends N
  ? Result
  : IncrementsUntil<Increment<N>, M, [...Result, N]>
type DecrementsUntil<N extends number, M extends number, Result extends Tuple = []> = M extends N
  ? Result
  : DecrementsUntil<Decrement<N>, M, [...Result, N]>

export type RangeThrough<From extends number, To extends number | undefined = undefined> = To extends number
  ? number extends From
    ? number[]
    : number extends To
    ? number[]
    : From extends From
    ? To extends To
      ? `${From}` extends `-${infer PN extends number}`
        ? `${To}` extends `-${infer PM extends number}`
          ? OrMoreSizeArray<PN> extends OrMoreSizeArray<PM>
            ? IncrementsThrough<From, To>
            : DecrementsThrough<From, To>
          : IncrementsThrough<From, To>
        : `${To}` extends `-${infer PM extends number}`
        ? DecrementsThrough<From, To>
        : OrMoreSizeArray<From> extends OrMoreSizeArray<To>
        ? DecrementsThrough<From, To>
        : IncrementsThrough<From, To>
      : never
    : never
  : RangeThrough<0, From>
type IncrementsThrough<N extends number, M extends number, Result extends Tuple = []> = M extends N
  ? [...Result, N]
  : IncrementsThrough<Increment<N>, M, [...Result, N]>
type DecrementsThrough<N extends number, M extends number, Result extends Tuple = []> = M extends N
  ? [...Result, N]
  : DecrementsThrough<Decrement<N>, M, [...Result, N]>

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
 * rangeUntil(3) returns [0, 1, 2]
 * rangeUntil(3) is typed as [0, 1, 2]
 * @example
 * rangeUntil(0) returns []
 * rangeUntil(0) is typed as []
 * @example
 * const n: number = 4
 * rangeUntil(n) returns [0, 1, 2, 3]
 * rangeUntil(n) is typed as number[]
 */
export function rangeUntil<To extends number>(to: To): RangeUntil<To>
export function rangeUntil<From extends number, To extends number>(from: From, to: To): RangeUntil<From, To>
export function rangeUntil<N extends number, M extends number>(n: N, m?: M): number[] {
  const [from, to] = m === undefined ? [0, n] : [n, m]

  const result = []
  if (from < to) {
    for (let i = from; i < to; i++) {
      result.push(i)
    }
  } else {
    for (let i = from; i > to; i--) {
      result.push(i)
    }
  }
  return result as any
}
export namespace rangeUntil {
  export function* Iterable(n: number): Generator<number> {
    for (let i = 0; i < n; i++) {
      yield i
    }
  }
}

export function rangeThrough<To extends number>(to: To): RangeThrough<To>
export function rangeThrough<From extends number, To extends number>(from: From, to: To): RangeThrough<From, To>
export function rangeThrough<N extends number, M extends number>(n: N, m?: M): number[] {
  const [from, to] = m === undefined ? [0, n] : [n, m]

  const result = []
  if (from < to) {
    for (let i = from; i <= to; i++) {
      result.push(i)
    }
  } else {
    for (let i = from; i >= to; i--) {
      result.push(i)
    }
  }
  return result as any
}

/**
 * @example
 * RepeatArray<3, ['a', 'b']> is typed as ['a', 'b', 'a', 'b', 'a', 'b']
 * RepeatArray<0, ['a', 'b']> is typed as []
 * @example
 * RepeatArray<0 | 1, ['a', 'b']> is typed as [] | ['a', 'b']
 * RepeatArray<number, ['a', 'b']> is typed as readonly ('a' | 'b')[]
 */
export type RepeatArray<N extends number, A extends Tuple> = number extends N
  ? readonly A[number][]
  : N extends N
  ? _RepeatArray<N, A>
  : never
type _RepeatArray<N extends number, A extends Tuple, L extends Tuple = [], R extends Tuple = []> = L['length'] extends N
  ? R
  : _RepeatArray<N, A, [...L, any], [...R, ...A]>

export function repeat<N extends number, const T extends Tuple>(count: N, ...values: T): RepeatArray<N, T> {
  return Array.from({ length: count * values.length }, (_, i) => values[i % values.length]) as any
}
export namespace repeat {
  /**
   * @example
   * repeat('a') yields 'a', 'a', 'a', ...
   * repeat(1, 2) yields 1, 2, 1, 2, ...
   */
  export function* Iterable<const T extends Tuple>(...values: T): Generator<T[number], void, undefined> {
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
