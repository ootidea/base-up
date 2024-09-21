export function curry<const H, const L extends readonly unknown[], const R>(
  f: (h: H, ...l: L) => R,
): (a: H) => (...bs: L) => R {
  return (h: H) =>
    (...l: L) =>
      f(h, ...l)
}

/**
 * Shorthand for IIFEs (Immediately Invoked Function Expressions).
 * It improves readability and can avoid issues with semicolons.
 * @example
 * const resultCode = call(() => {
 *   switch (type) {
 *     case 'success':
 *       return 1
 *     case 'failure':
 *       return 2
 *     default:
 *       return 3
 *   }
 * })
 */
export function call<T>(f: () => T): T {
  return f()
}

/**
 * Returns the given value as is.
 * It is known as the identity function in mathematics.
 * @example Primitive values
 * identity(9) returns 9
 * identity('text') returns 'text'
 * @example Mutable object
 * const now = new Date()
 * identity(now) returns now
 */
export function identity<const T>(value: T): T {
  return value
}

/**
 * The Predicate<T> is either a type predicate or a function that returns a boolean, and it takes one argument of type T.
 * The parameter T is optional with a default value of unknown.
 */
export type Predicate<T = unknown> = ((value: T) => value is any) | ((value: T) => boolean)

/**
 * If a type predicate is passed, it returns the type after 'is'.
 * If a function that returns a boolean is passed, it returns the type of the argument.
 * In all other cases, it returns never.
 */
export type PredicateResult<T> = T extends (value: any) => value is infer R
  ? R
  : T extends (value: infer V) => boolean
    ? V
    : never

/**
 * Passes a value through a pipeline (a sequence of functions).
 * For example, pipe(x, f, g) is equivalent to g(f(x)).
 */
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
export function pipe<const A, const T extends readonly ((_: any) => any)[]>(a: A, ...fs: T) {
  let value: any = a
  for (const f of fs) {
    value = f(value)
  }
  return value
}
