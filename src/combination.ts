import { NonEmptyArray, Tuple } from './Array'
import { removeAt } from './collectionUpdate'
import { rangeUntil } from './generate'

export function cartesianProductOf<const T extends Tuple, const U extends Tuple>(
  lhs: T,
  rhs: U
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

  return rangeUntil(self.length).flatMap((i) => {
    const value = self[i]!
    return permutationOf(removeAt(self, i), n - 1).map((rest) => [value, ...rest])
  })
}
export namespace permutationOf {
  export function number(lhs: number, rhs: number): number {
    return rangeUntil(lhs, lhs - rhs).reduce((a, b) => a * b)
  }
}

export function slide<const T extends Tuple, N extends number>(self: T, n: N): [T[number], T[number]][] {
  const result = []
  if (n < 0) throw new RangeError()

  if (n > self.length) return []

  for (let i = 0; i + n - 1 < self.length; i++) {
    result.push(self.slice(i, i + n))
  }
  return result as any
}

export function prefixesOf<T>(self: readonly T[]): NonEmptyArray<readonly T[]> {
  const result: NonEmptyArray<readonly T[]> = [[]]
  const prefixes = []
  for (const element of self) {
    prefixes.push(element)
    result.push([...prefixes])
  }
  return result
}
