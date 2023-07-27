import { Tuple } from './Array/other'

/**
 * For some reason, the Blob type is a subtype of Function, even though other class types are not.
 * Therefore, you should not use 'T extends Function' to determine whether it is a function.
 * @example
 * const f1: StrictFunction = () => {} // OK
 * const f2: StrictFunction = new Blob() // Type error as expected
 * const f3: Function = new Blob() // Contrary to expectations, there is no type error
 */
export type StrictFunction = (..._: readonly unknown[]) => unknown

export function curry<const H, const L extends Tuple, const R>(f: (h: H, ...l: L) => R): (a: H) => (...bs: L) => R {
  return (h: H) =>
    (...l: L) =>
      f(h, ...l)
}

export function call<const T>(f: () => T): T {
  return f()
}

export function identity<const T>(value: T): T {
  return value
}

export type Predicate<T = unknown> = ((value: T) => value is any) | ((value: T) => boolean)
export type PredicateResult<T> = T extends (value: any) => value is infer R
  ? R
  : T extends (value: infer V) => boolean
  ? V
  : never

export function pipe<const A>(a: A): A
export function pipe<const A, B>(a: A, b: (a: A) => B): B
export function pipe<const A, B, C>(a: A, b: (a: A) => B, c: (b: B) => C): C
export function pipe<const A, B, C, D>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D): D
export function pipe<const A, B, C, D, E>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E): E
export function pipe<const A, B, C, D, E, F>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
): F
export function pipe<const A, B, C, D, E, F, G>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G,
): G
export function pipe<const A, B, C, D, E, F, G, H>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G,
  h: (g: G) => H,
): H
export function pipe<const A, B, C, D, E, F, G, H, I>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G,
  h: (g: G) => H,
  i: (h: H) => I,
): I
export function pipe<const A, B, C, D, E, F, G, H, I, J>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G,
  h: (g: G) => H,
  i: (h: H) => I,
  j: (i: I) => J,
): J
export function pipe<const A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G,
  h: (g: G) => H,
  i: (h: H) => I,
  j: (i: I) => J,
  k: (j: J) => K,
): K
export function pipe<const A, B, C, D, E, F, G, H, I, J, K, L>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G,
  h: (g: G) => H,
  i: (h: H) => I,
  j: (i: I) => J,
  k: (j: J) => K,
  l: (k: K) => L,
): L
export function pipe<const A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G,
  h: (g: G) => H,
  i: (h: H) => I,
  j: (i: I) => J,
  k: (j: J) => K,
  l: (k: K) => L,
  m: (l: L) => M,
): M
export function pipe<A>(a: A, ...fs: readonly ((a: A) => A)[]): A
export function pipe<const A, const T extends readonly StrictFunction[]>(a: A, ...fs: T) {
  let value: any = a
  for (const f of fs) {
    value = f(value)
  }
  return value
}
