
export function assert<T, U extends T>(value: T, predicate: (value: T) => value is U): asserts value is U
export function assert<T>(value: T, predicate: (value: T) => boolean): void | never
export function assert<T>(value: T, predicate: (value: T) => boolean): void | never {
  if (predicate(value)) {
    throw new Error()
  }
}

