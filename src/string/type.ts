/**
 * @example
 * toNumber('123') results 123
 * toNumber('123') is typed as 123
 * @example
 * toNumber('-1') results -1
 * toNumber('-1') is typed as -1
 * @example
 * toNumber('1.0') results 1
 * toNumber('1.0') is typed as number
 */
export function toNumber<N extends number>(text: `${N}`): N
export function toNumber(text: any): number
export function toNumber(text: any): number {
  return Number(text) as any
}

/**
 * @example
 * ToString<-123> is equivalent to '-123'
 * @example
 * ToString<123n> is equivalent to '123'
 * @example
 * ToString<1.0> is equivalent to '1'
 * @example
 * ToString<boolean> is equivalent to 'false' | 'true'
 * @example
 * ToString<number | undefined> is equivalent to `${number}` | 'undefined'
 */
export type ToString<T> = T extends string | number | bigint | boolean | null | undefined ? `${T}` : string

export function toString<T extends string | number | bigint | boolean | null | undefined>(value: T): `${T}`
export function toString(value: any): string
export function toString(value: any): string {
  return String(value)
}
