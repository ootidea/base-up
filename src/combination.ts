import { AccurateTuple } from './Array'

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
