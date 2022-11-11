import { LimitedSizeArray } from '../Array/type'

export function* map<T, U>(self: Iterable<T>, f: (_: T) => U): Generator<U> {
  const iterator = self[Symbol.iterator]()
  for (let element = iterator.next(); !element.done; element = iterator.next()) {
    yield f(element.value)
  }
  iterator.return?.()
}

export function filter<T, U extends T>(self: Iterable<T>, f: (_: T) => _ is U): Generator<U>
export function filter<T>(self: Iterable<T>, f: (_: T) => boolean): Generator<T>
export function* filter<T>(self: Iterable<T>, f: (_: T) => boolean): Generator<T> {
  const iterator = self[Symbol.iterator]()
  for (let element = iterator.next(); !element.done; element = iterator.next()) {
    if (f(element.value)) {
      yield element.value
    }
  }
  iterator.return?.()
}

export function elementAt<T>(self: Iterable<T>, n: number): T | undefined {
  const iterator = self[Symbol.iterator]()
  let i: number
  let element: IteratorResult<T>
  for (i = 0, element = iterator.next(); i < n && !element.done; ++i, element = iterator.next()) {}
  iterator.return?.()
  return element.value
}

export function take<T, N extends number>(self: Iterable<T>, n: N): LimitedSizeArray<N, T> {
  const result: T[] = []
  const iterator = self[Symbol.iterator]()
  for (let element = iterator.next(); !element.done && result.length < n; element = iterator.next()) {
    result.push(element.value)
  }
  iterator.return?.()
  return result as any
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

export function* until(n: number): Generator<number> {
  for (let i = 0; i < n; i++) {
    yield i
  }
}
