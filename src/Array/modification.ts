import { ReadonlyNonEmptyArray } from './type'

export function tail<T>(self: ReadonlyNonEmptyArray<T>): readonly T[]
export function tail<T>(self: readonly T[]): readonly T[] | undefined
export function tail<T>(self: readonly T[]): readonly T[] | undefined {
  if (self.length === 0) return undefined

  const cloned = self.slice()
  cloned.shift()
  return cloned
}

export function removeAt<T>(array: readonly T[], i: number): readonly T[] {
  const cloned = array.slice()
  cloned.splice(i, 1)
  return cloned
}
