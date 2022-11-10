export function* map<T, U>(iterable: Iterable<T>, f: (_: T) => U): Generator<U> {
  const iterator = iterable[Symbol.iterator]()
  for (let value = iterator.next(); !value.done; value = iterator.next()) {
    yield f(value.value)
  }
  iterator.return?.()
}

export function filter<T, U extends T>(iterable: Iterable<T>, f: (_: T) => _ is U): Generator<U>
export function filter<T>(iterable: Iterable<T>, f: (_: T) => boolean): Generator<T>
export function* filter<T>(iterable: Iterable<T>, f: (_: T) => boolean): Generator<T> {
  const iterator = iterable[Symbol.iterator]()
  for (let value = iterator.next(); !value.done; value = iterator.next()) {
    if (f(value.value)) {
      yield value.value
    }
  }
  iterator.return?.()
}
