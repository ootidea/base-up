import { AccurateTuple } from './Array'

/**
 * @example
 * Until<3> is equivalent to 0 | 1 | 2
 * Until<0> is equivalent to never
 * @example
 * Until<2 | 4> is equivalent to 0 | 1 | 2 | 3
 * Until<number> is equivalent to number
 */
export type Until<N extends number> = number extends N ? number : N extends N ? _Until<N> : never
type _Until<N extends number, Result extends AccurateTuple = []> = Result['length'] extends N
  ? never
  : Result['length'] | _Until<N, [...Result, any]>

/**
 * @example
 * randomIntegerUntil(3) results 0 or 1 or 2
 * randomIntegerUntil(1) results 0
 * randomIntegerUntil(0) results 0
 */
export function randomIntegerUntil<N extends number>(value: N): Until<N> {
  return Math.floor(Math.random() * value) as any
}

export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

/**
 * Function to calculate modulo instead of reminder.
 * @example
 * mod(4, 3) results 1
 * mod(3, 3) results 0
 * mod(2, 3) results 2
 * mod(1, 3) results 1
 * mod(0, 3) results 0
 * mod(-1, 3) results 2
 * mod(-2, 3) results 1
 * mod(-3, 3) results 0
 * mod(-4, 3) results 2
 * @example
 * mod(4, -3) results -2
 * mod(3, -3) results -0
 * mod(2, -3) results -1
 * mod(1, -3) results -2
 * mod(0, -3) results -0
 * mod(-1, -3) results -1
 * mod(-2, -3) results -2
 * mod(-3, -3) results -0
 * mod(-4, -3) results -1
 */
export function mod(a: number, b: number): number {
  return ((a % b) + b) % b
}

export function factorialOf(n: number): number {
  if (n === 0) return 1
  if (n < 0) return NaN

  let result = n
  for (let i = n - 1; i > 1; i--) {
    result *= i
  }
  return result
}
