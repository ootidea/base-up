import { PlainValue } from './type'
import { Equals, IsOneOf } from './typePredicate'

export type AllKeysOf<T> = IsOneOf<T, [undefined, null, {}]> extends true
  ? []
  : Equals<T, any> extends true
  ? (string | symbol)[]
  : T extends Record<keyof any, PlainValue<Function>>
  ? ToStringKey<keyof T>[]
  : (string | symbol)[]
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
  const resultSet: Set<string | symbol> = new Set()
  const resultArray: Array<string | symbol> = []

  if (objectLike === null || objectLike === undefined) return resultArray as any

  const basePrototype = Object.getPrototypeOf({})
  let current = objectLike
  while (current !== basePrototype) {
    for (const ownPropertyName of Object.getOwnPropertyNames(current)) {
      if (ownPropertyName === 'constructor') continue

      if (!resultSet.has(ownPropertyName)) {
        resultSet.add(ownPropertyName)
        resultArray.push(ownPropertyName)
      }
    }
    for (const ownPropertySymbol of Object.getOwnPropertySymbols(current)) {
      if (!resultSet.has(ownPropertySymbol)) {
        resultSet.add(ownPropertySymbol)
        resultArray.push(ownPropertySymbol)
      }
    }
    current = Object.getPrototypeOf(current)
  }
  return resultArray as any
}

export type AllValuesOf<T> = IsOneOf<T, [undefined, null]> extends true
  ? []
  : Equals<T, any> extends true
  ? any[]
  : T extends Record<keyof any, PlainValue<Function>>
  ? T[keyof T][]
  : unknown[]

export function allValuesOf<T>(objectLike: T): AllValuesOf<T> {
  return allKeysOf(objectLike).map((key) => (objectLike as any)[key]) as any
}
