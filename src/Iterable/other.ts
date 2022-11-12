export function* until(n: number): Generator<number> {
  for (let i = 0; i < n; i++) {
    yield i
  }
}

export function* repeat<T>(value: T): Generator<T> {
  while (true) yield value
}

export function* repeatApply<T>(initialValue: T, f: (_: T) => T): Generator<T> {
  let value = initialValue
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

export function* zip<T, U>(lhs: Iterable<T>, rhs: Iterable<U>): Generator<[T, U]> {
  const lhsIterator = lhs[Symbol.iterator]()
  const rhsIterator = rhs[Symbol.iterator]()
  for (
    let lhsElement = lhsIterator.next(), rhsElement = rhsIterator.next();
    !lhsElement.done && !rhsElement.done;
    lhsElement = lhsIterator.next(), rhsElement = rhsIterator.next()
  ) {
    yield [lhsElement.value, rhsElement.value]
  }
  lhsIterator.return?.()
  rhsIterator.return?.()
}
