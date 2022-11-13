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
