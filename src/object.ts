import { UnionToTuple } from './Array/other'
import { isNotEmpty } from './collectionPredicate'
import { drop } from './filter'
import { IntegerRangeThrough } from './number/range'
import { IsTemplateLiteral } from './string/other'
import { MergeIntersection } from './type'

/**
 * @example
 * RequiredKeysOf<{ a: 1; b?: 2; c: 3 }> equals 'a' | 'c'
 * RequiredKeysOf<{ value: string; 0: boolean }> equals 'value' | 0
 * RequiredKeysOf<{ a?: 1 }> equals never
 * @example
 * RequiredKeysOf<[0, 1?, 2?]> equals '0' | keyof []
 */
export type RequiredKeysOf<T> = T extends T
  ? keyof T extends infer K extends keyof T
    ? K extends K
      ? T extends Record<K, any>
        ? K
        : never
      : never
    : never
  : never

/**
 * @example
 * OptionalKeysOf<{ a: 1; b?: 2; c: 3 }> equals 'b'
 * OptionalKeysOf<{ value?: string; 0?: boolean }> equals 'value' | 0
 * OptionalKeysOf<{ a: 1 }> equals never
 * @example Optional elements of a tuple
 * OptionalKeysOf<[0, 1?, 2?]> equals '1' | '2'
 */
export type OptionalKeysOf<T> = T extends T
  ? keyof T extends infer K extends keyof T
    ? K extends K
      ? T extends Record<K, any>
        ? never
        : K
      : never
    : never
  : never

/**
 * @example
 * AtLeastOneProperty<{ a: 1; b?: 2; c: 3 }> equals { a: 1; b?: 2; c?: 3 } | { a?: 1; b?: 2; c: 3 }
 * AtLeastOneProperty<{ a: 1; b?: 2 }> equals { a: 1; b?: 2 }
 * AtLeastOneProperty<{ b?: 2 }> equals never
 * AtLeastOneProperty<{}> equals never
 */
export type AtLeastOneProperty<T> = MergeIntersection<
  Partial<T> & { [K in RequiredKeysOf<T>]: Pick<T, K> }[RequiredKeysOf<T>]
>

/**
 * @example
 * CountProperties<{ name: string; age: number }> equals 2
 * CountProperties<{ name?: string; age?: number }> equals 0 | 1 | 2
 * CountProperties<{ none: never }> equals 1
 * CountProperties<{}> equals 0
 * CountProperties<Record<never, any>> equals 0
 * @example
 * assertTypeEquality<CountProperties<{ size: number } | { name: string; age: number }>, 1 | 2>()
 * assertTypeEquality<CountProperties<Record<string, any>, number>()
 * assertTypeEquality<CountProperties<Record<`${number}`, any>, number>()
 * assertTypeEquality<CountProperties<any, number>()
 * assertTypeEquality<CountProperties<never>, never>()
 */
export type CountProperties<T> = T extends T
  ? keyof T extends infer K
    ? string extends K
      ? number
      : number extends K
      ? number
      : symbol extends K
      ? number
      : IsTemplateLiteral<K> extends true
      ? number
      : IntegerRangeThrough<
          UnionToTuple<RequiredKeysOf<T>>['length'] extends infer U extends number ? U : never,
          UnionToTuple<keyof T>['length'] extends infer U extends number ? U : never
        >
    : never
  : never

export type NestedProperty<T, Ks extends readonly (keyof any)[]> = Ks extends readonly []
  ? T
  : Ks extends readonly [infer H extends keyof T, ...infer R extends readonly (keyof any)[]]
  ? NestedProperty<T[H], R>
  : undefined

/**
 * @example
 * getNestedProperty({ a: 123 }, 'a') returns 123
 * getNestedProperty({ a: 123, b: { c: 'nested' } }, 'b', 'c') returns 'nested'
 * @example
 * getNestedProperty({ a: 123 }, 'z', 'x') returns undefined
 * @example Empty path
 * getNestedProperty({ a: 123 }) returns { a: 123 }
 */
export function getNestedProperty<T extends object, Ks extends readonly (keyof any)[]>(
  self: T,
  ...keys: Ks
): NestedProperty<T, Ks> {
  if (!isNotEmpty(keys)) return self as any

  const firstKey = keys[0]
  if (firstKey in self) {
    return getNestedProperty((self as any)[firstKey], ...(drop(keys) as any)) as any
  }
  return undefined as any
}

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>
