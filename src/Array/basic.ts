import { NonEmptyArray, ReadonlyNonEmptyArray } from './type'

export function head<T>(array: ReadonlyNonEmptyArray<T>): T
export function head<T>(array: readonly T[]): T | undefined {
  return array[0]
}

export function filterNonEmptyArray<T>(array: readonly Array<T>[]): readonly NonEmptyArray<T>[] {
  return array.filter((value) => value.length > 0) as any
}
