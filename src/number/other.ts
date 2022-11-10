/**
 * @example
 * Until<3> is equivalent to 0 | 1 | 2
 * Until<0> is equivalent to never
 * @example
 * Until<2 | 4> is equivalent to 0 | 1 | 2 | 3
 * Until<number> is equivalent to never
 */
export type Until<N extends number> = N extends N ? _Until<N> : never
type _Until<N extends number, Result extends readonly any[] = []> = Result['length'] extends N
  ? never
  : Result['length'] | _Until<N, [...Result, any]>

