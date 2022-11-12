import { AccurateTuple, Tuple } from '../Array/type'

export function* until(n: number): Generator<number> {
  for (let i = 0; i < n; i++) {
    yield i
  }
}

/**
 * @example
 * repeat('a') yields 'a', 'a', 'a', ...
 * repeat(1, 2) yields 1, 2, 1, 2, ...
 */
export function repeat<T extends AccurateTuple>(...values: T): Generator<T[number], void, undefined>
export function repeat<T extends Tuple>(...values: T): Generator<T[number], void, undefined>
export function* repeat<T extends Tuple>(...values: T): Generator<T[number], void, undefined> {
  while (true) yield* values
}

export function* repeatApply<T>(first: T, f: (_: T) => T): Generator<T> {
  let value = first
  while (true) {
    yield value
    value = f(value)
  }
}

export function elementAt<T>(self: Iterable<T>, n: number): T | undefined {
  const iterator = self[Symbol.iterator]()
  let i: number
  let element: IteratorResult<T>
  for (i = 0, element = iterator.next(); i < n && !element.done; ++i, element = iterator.next()) {}
  iterator.return?.()
  return element.value
}

export function* map<T, U>(self: Iterable<T>, f: (_: T) => U): Generator<U> {
  for (const value of self) {
    yield f(value)
  }
}

export function filter<T, U extends T>(self: Iterable<T>, f: (_: T) => _ is U): Generator<U>
export function filter<T>(self: Iterable<T>, f: (_: T) => boolean): Generator<T>
export function* filter<T>(self: Iterable<T>, f: (_: T) => boolean): Generator<T> {
  for (const value of self) {
    if (f(value)) {
      yield value
    }
  }
}

type UnwrapIterable<T> = T extends Iterable<infer U> ? U : T
type UnwrapIterableAll<T extends Tuple> = T extends readonly [infer H, ...infer L]
  ? [UnwrapIterable<H>, ...UnwrapIterableAll<L>]
  : []
type Zip<T extends readonly Iterable<any>[]> = Generator<UnwrapIterableAll<T>>

export function* zip<T extends readonly Iterable<any>[]>(...source: T): Zip<T> {
  const iterators = source.map((iterable) => iterable[Symbol.iterator]())
  for (
    let elements = iterators.map((iterator) => iterator.next());
    elements.every((element) => !element.done);
    elements = iterators.map((iterator) => iterator.next())
  ) {
    yield elements.map((element) => element.value) as any
  }
  iterators.map((iterator) => iterator.return?.())
}
