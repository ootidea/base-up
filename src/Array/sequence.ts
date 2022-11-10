/**
 * @example
 * Until<3> is equivalent to [0, 1, 2]
 * @example
 * Until<0> is equivalent to []
 * @example
 * Until<2 | 4> is equivalent to [0, 1] | [0, 1, 2, 3]
 * @example
 * Until<number> is equivalent to readonly number[]
 */
export type Until<N extends number> = number extends N ? readonly number[] : N extends N ? _Until<N> : never
type _Until<N extends number, Result extends readonly any[] = []> = Result['length'] extends N
  ? Result
  : _Until<N, [...Result, Result['length']]>

/**
 * @example
 * until(3) results [0, 1, 2]
 * until(3) is typed as [0, 1, 2]
 * @example
 * const n: number = 3
 * until(n) is typed as readonly number[]
 */
export function until<N extends number>(length: N): number extends N ? readonly number[] : Until<N> {
  return Array.from({ length }, (_, i) => i) as any
}
