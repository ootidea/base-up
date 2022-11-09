export function* map<T, U>(iterable: Iterable<T>, f: (_: T) => U): Generator<U> {
  const iterator = iterable[Symbol.iterator]()
  for (let value = iterator.next(); !value.done; value = iterator.next()) {
    yield f(value.value)
  }
  iterator.return?.()
}
