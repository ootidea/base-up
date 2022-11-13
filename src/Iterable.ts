import { Tuple } from './Array'

export function elementAt<T>(self: Iterable<T>, n: number): T | undefined {
  const iterator = self[Symbol.iterator]()
  let i: number
  let element: IteratorResult<T>
  for (i = 0, element = iterator.next(); i < n && !element.done; ++i, element = iterator.next()) {}
  iterator.return?.()
  return element.value
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
