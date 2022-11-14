import { Tuple } from './Array'

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

export function merge<T, U>(lhs: readonly T[], rhs: readonly U[]): readonly (T | U)[] {
  const result = []
  const minLength = Math.min(lhs.length, rhs.length)
  for (let i = 0; i < minLength; ++i) {
    result.push(lhs[i], rhs[i])
  }
  if (lhs.length === minLength) {
    result.push(...rhs.slice(minLength))
  } else {
    result.push(...lhs.slice(minLength))
  }
  return result
}
