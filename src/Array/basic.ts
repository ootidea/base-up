import { NonEmptyArray, ReadonlyNonEmptyArray } from './type'

export function first<T>(array: ReadonlyNonEmptyArray<T>): T
export function first<T>(array: readonly T[]): T | undefined
export function first<T>(array: readonly T[]): T | undefined {
  return array[0]
}

export function last<T>(array: ReadonlyNonEmptyArray<T>): T
export function last<T>(array: readonly T[]): T | undefined
export function last<T>(array: readonly T[]): T | undefined {
  return array[array.length - 1]
}

export function filterNonEmptyArray<T>(array: readonly Array<T>[]): readonly NonEmptyArray<T>[] {
  return array.filter((value) => value.length > 0) as any
}
