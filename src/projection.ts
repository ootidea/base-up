import { map } from './all'
import { NonClassValue } from './type'
import { Equals, IsOneOf } from './typePredicate'

export type AllKeysOf<T> = IsOneOf<T, [undefined, null]> extends true
  ? Set<never>
  : Equals<T, any> extends true
  ? Set<string | symbol>
  : T extends Record<keyof any, NonClassValue>
  ? Set<ToStringKey<keyof T>>
  : Set<string | symbol>
type ToStringKey<K extends keyof any> = K extends number ? `${K}` : K

/**
 * Get all keys of an object including inherited keys.
 * It behaves similarly to the keyof operator.
 * @example
 * allKeysOf({ name: 'Bob', age: 60 }) returns new Set(['name', 'age'])
 * allKeysOf({}) returns new Set()
 * allKeysOf({ 0: false, 1: true }) returns new Set(['0', '1'])
 * allKeysOf({ [Symbol.iterator]: false }) returns new Set([Symbol.iterator])
 */
export function allKeysOf<const T>(objectLike: T): AllKeysOf<T> {
  const result: Set<string | symbol> = new Set()

  if (objectLike === null || objectLike === undefined) return result as any

  const basePrototype = Object.getPrototypeOf({})
  let current = objectLike
  while (current !== basePrototype) {
    for (const ownPropertyName of Object.getOwnPropertyNames(current)) {
      if (ownPropertyName !== 'constructor') {
        result.add(ownPropertyName)
      }
    }
    for (const ownPropertySymbol of Object.getOwnPropertySymbols(current)) {
      result.add(ownPropertySymbol)
    }
    current = Object.getPrototypeOf(current)
  }
  return result as any
}

export type AllValuesOf<T> = IsOneOf<T, [undefined, null]> extends true
  ? Set<never>
  : Equals<T, any> extends true
  ? Set<unknown>
  : T extends Record<keyof any, NonClassValue>
  ? Set<T[keyof T]>
  : Set<unknown>

export function allValuesOf<T>(objectLike: T): AllValuesOf<T> {
  const allKeys = allKeysOf(objectLike)
  return map.Set(allKeys, (key) => (objectLike as any)[key]) as any
}
