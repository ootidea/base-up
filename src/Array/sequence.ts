/**
 * @example
 * Until<3> is equivalent to [0, 1, 2]
 * @example
 * Until<0> is equivalent to []
 * @example
 * Until<3 | 5> is equivalent to [0, 1, 2]
 * @example
 * Until<number> is equivalent to []
 */
export type Until<N extends number, Result extends readonly any[] = []> = Result['length'] extends N
  ? Result
  : Until<N, [...Result, Result['length']]>

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
