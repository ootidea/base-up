import { AccurateTuple, NonEmptyArray, ReadonlyNonEmptyArray } from './Array'

export function cartesianProductOf<T extends AccurateTuple, U extends AccurateTuple>(
  lhs: T,
  rhs: U
): readonly [T[number], U[number]][] {
  const result = []
  for (const lhsElement of lhs) {
    for (const rhsElement of rhs) {
      result.push([lhsElement, rhsElement])
    }
  }
  return result as any
}

export function prefixesOf<T>(self: readonly T[]): ReadonlyNonEmptyArray<readonly T[]> {
  const result: NonEmptyArray<readonly T[]> = [[]]
  const prefixes = []
  for (const element of self) {
    prefixes.push(element)
    result.push(prefixes.slice())
  }
  return result
}
