import { AccurateTuple, ReadonlyNonEmptyArray, Tuple } from './type'

export function push<T extends AccurateTuple, U extends AccurateTuple>(self: T, ...args: U): [...T, ...U]
export function push<T extends Tuple, U extends Tuple>(self: T, ...args: U): [...T, ...U]
export function push<T extends Tuple, U extends Tuple>(self: T, ...args: U): [...T, ...U] {
  return [...self, ...args]
}

export function tail<T>(self: ReadonlyNonEmptyArray<T>): readonly T[]
export function tail<T>(self: readonly T[]): readonly T[] | undefined
export function tail<T>(self: readonly T[]): readonly T[] | undefined {
  if (self.length === 0) return undefined

  const cloned = self.slice()
  cloned.shift()
  return cloned
}

export function removeAt<T>(self: readonly T[], i: number): readonly T[] {
  const cloned = self.slice()
  cloned.splice(i, 1)
  return cloned
}
