import { NonEmptyArray } from './Array/MinLengthArray'
import { IsTuple } from './Array/other'
import { removeAt } from './collectionUpdate'
import { sequentialNumbersUntil } from './generate'

export function cartesianProductOf<const T extends readonly unknown[], const U extends readonly unknown[]>(
  lhs: T,
  rhs: U,
): [T[number], U[number]][] {
  const result = []
  for (const lhsElement of lhs) {
    for (const rhsElement of rhs) {
      result.push([lhsElement, rhsElement])
    }
  }
  return result as any
}

export function permutationOf<T>(self: readonly T[], n: number = self.length): (readonly T[])[] {
  if (n <= 0) return [[]]

  if (self.length <= 1) return [self]

  return sequentialNumbersUntil(self.length).flatMap((i) => {
    const value = self[i]!
    return permutationOf(removeAt(self, i), n - 1).map((rest) => [value, ...rest])
  })
}
export function permutationOfNumber(lhs: number, rhs: number): number {
  return sequentialNumbersUntil(lhs, lhs - rhs).reduce((a, b) => a * b)
}

/**
 * @example
 * createNGrams([1, 2, 3], 2) returns [[1, 2], [2, 3]]
 * createNGrams([1, 2, 3], 3) returns [[1, 2, 3]]
 * createNGrams([1, 2, 3], 1) returns [[1], [2], [3]]
 */
export function createNGrams<const T extends readonly unknown[], N extends number>(self: T, n: N): T[number][][] {
  const result = []
  if (n < 0) throw new RangeError()

  if (n > self.length) return []

  for (let i = 0; i + n - 1 < self.length; i++) {
    result.push(self.slice(i, i + n))
  }
  return result
}

/**
 * @example
 * PrefixesOf<[1, 2, 3]> returns [[], [1], [1, 2], [1, 2, 3]]
 */
export type PrefixesOf<T extends readonly unknown[]> = IsTuple<T> extends false ? T[] : PrefixesOfForTuple<T>
export type PrefixesOfForTuple<T extends readonly unknown[], R extends readonly unknown[] = []> = T extends readonly [
  infer H,
  ...infer L,
]
  ? [R, ...PrefixesOfForTuple<L, [...R, H]>]
  : IsTuple<T> extends false
  ? [R, [...R, ...T]]
  : [R]

/**
 * @example
 * prefixesOf([1, 2, 3]) returns [[], [1], [1, 2], [1, 2, 3]]
 * prefixesOf([]) returns [[]]
 */
export function prefixesOf<T>(self: readonly T[]): NonEmptyArray<readonly T[]> {
  const result: NonEmptyArray<readonly T[]> = [[]]
  const prefixes = []
  for (const element of self) {
    prefixes.push(element)
    result.push([...prefixes])
  }
  return result
}
