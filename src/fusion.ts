import { Tuple } from './Array/other'
import { IntegerRangeUntil } from './number/other'

type UnwrapArrayAll<T extends Tuple> = T extends readonly [infer H, ...infer L]
  ? [H extends readonly (infer U)[] ? U : H, ...UnwrapArrayAll<L>]
  : []

type UnwrapIterableAll<T extends Tuple> = T extends readonly [infer H, ...infer L]
  ? [H extends Iterable<infer U> ? U : H, ...UnwrapIterableAll<L>]
  : []

type ZipArray<T extends readonly (readonly any[])[]> = UnwrapArrayAll<T>[]

/**
 * @example
 * zip([1, 2, 3], ['a', 'b', 'c']) returns [[1, 'a'], [2, 'b'], [3, 'c']]
 * zip([1, 2, 3], ['a', 'b']) returns [[1, 'a'], [2, 'b']]
 * @example
 * zip([1, 2, 3], ['a', 'b', 'c'], [true, false, true]) returns [[1, 'a', true], [2, 'b', false], [3, 'c', true]]
 */
export function zip<T extends readonly (readonly any[])[]>(...source: T): ZipArray<T> {
  const result = []
  const length = Math.min(...source.map((array) => array.length))
  for (let i = 0; i < length; i++) {
    result.push(source.map((array) => array[i]))
  }
  return result as any
}
export namespace zip {
  type ZipIterable<T extends readonly Iterable<any>[]> = Iterable<UnwrapIterableAll<T>>
  export function* Iterable<T extends readonly Iterable<any>[]>(...source: T): ZipIterable<T> {
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
}

export function zipWith<T extends readonly (readonly any[])[], U>(
  f: (...tuple: UnwrapArrayAll<T>) => U,
  ...source: T
): U[] {
  const result = []
  const length = Math.min(...source.map((array) => array.length))
  for (let i = 0; i < length; i++) {
    result.push(f(...(source.map((array) => array[i]) as any)))
  }
  return result
}

type AtLeastOneIsNonUndefined<T extends Tuple, N extends number = IntegerRangeUntil<T['length']>> = N extends N
  ? SetUndefinedableAllBut<T, N>
  : never
type SetUndefinedableAllBut<T extends Tuple, N extends number> = T extends readonly [infer H, ...infer L]
  ? N extends L['length']
    ? [H, ...SetUndefinedableAllBut<L, N>]
    : [H | undefined, ...SetUndefinedableAllBut<L, N>]
  : []

type ZipAllArray<T extends readonly (readonly any[])[]> = AtLeastOneIsNonUndefined<UnwrapIterableAll<T>>[]
export function zipAll<T extends readonly (readonly any[])[]>(...source: T): ZipAllArray<T> {
  const result = []
  const length = Math.max(...source.map((array) => array.length))
  for (let i = 0; i < length; i++) {
    result.push(source.map((array) => array[i]))
  }
  return result as any
}
export namespace zipAll {
  type ZipAllIterable<T extends readonly Iterable<any>[]> = Iterable<AtLeastOneIsNonUndefined<UnwrapIterableAll<T>>>
  export function* Iterable<T extends readonly Iterable<any>[]>(...source: T): ZipAllIterable<T> {
    const iterators = source.map((iterable) => iterable[Symbol.iterator]())
    for (
      let elements = iterators.map((iterator) => iterator.next());
      elements.some((element) => !element.done);
      elements = iterators.map((iterator) => iterator.next())
    ) {
      yield elements.map((element) => element.value) as any
    }
    iterators.map((iterator) => iterator.return?.())
  }
}

export function merge<T, U>(lhs: readonly T[], rhs: readonly U[]): (T | U)[] {
  const result = []
  const minLength = Math.min(lhs.length, rhs.length)
  for (let i = 0; i < minLength; ++i) {
    result.push(lhs[i]!, rhs[i]!)
  }
  if (lhs.length === minLength) {
    result.push(...rhs.slice(minLength))
  } else {
    result.push(...lhs.slice(minLength))
  }
  return result
}
