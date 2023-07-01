import { Tuple } from './Array/other'

export function curry<const H, const L extends Tuple, const R>(f: (h: H, ...l: L) => R): (a: H) => (...bs: L) => R {
  return (h: H) =>
    (...l: L) =>
      f(h, ...l)
}

export function bindAllButFirst<const H, const L extends Tuple, const R>(
  f: (h: H, ...l: L) => R,
  ...l: L
): (h: H) => R {
  return (h: H) => f(h, ...l)
}

export function applyFirst<const H, const L extends Tuple, const R>(f: (h: H, ...l: L) => R, h: H): (...l: L) => R {
  return (...l: L) => f(h, ...l)
}

export function call<const T>(f: () => T): T {
  return f()
}

export function identity<const T>(value: T): T {
  return value
}

export function returnLast<const T extends Tuple>(...args: T): T extends readonly [...any, infer L] ? L : undefined {
  return args[args.length - 1] as any
}

export function pipe<const A>(a: A): A
export function pipe<const A, const B>(a: A, b: (a: A) => B): B
export function pipe<const A, const B, const C>(a: A, b: (a: A) => B, c: (b: B) => C): C
export function pipe<const A, const B, const C, const D>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D): D
export function pipe<const A, const B, const C, const D, const E>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E
): E
export function pipe<const A, const B, const C, const D, const E, const F>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F
): F
export function pipe<const A, const B, const C, const D, const E, const F, const G>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G
): G
export function pipe<const A, const B, const C, const D, const E, const F, const G, const H>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G,
  h: (g: G) => H
): H
export function pipe<const A, const B, const C, const D, const E, const F, const G, const H, const I>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G,
  h: (g: G) => H,
  i: (h: H) => I
): I
export function pipe<const A, const B, const C, const D, const E, const F, const G, const H, const I, const J>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C,
  d: (c: C) => D,
  e: (d: D) => E,
  f: (e: E) => F,
  g: (f: F) => G,
  h: (g: G) => H,
  i: (h: H) => I,
  j: (i: I) => J
): J
export function pipe<const A, const B, const C, const D, const E, const F, const G, const H, const I, const J, const K>(
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
  k: (j: J) => K
): K
export function pipe<
  const A,
  const B,
  const C,
  const D,
  const E,
  const F,
  const G,
  const H,
  const I,
  const J,
  const K,
  const L
>(
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
  l: (k: K) => L
): L
export function pipe<
  const A,
  const B,
  const C,
  const D,
  const E,
  const F,
  const G,
  const H,
  const I,
  const J,
  const K,
  const L,
  const M
>(
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
  m: (l: L) => M
): M
export function pipe<const A, const T extends readonly Function[]>(a: A, ...fs: T) {
  let value: any = a
  for (const f of fs) {
    value = f(value)
  }
  return value
}
