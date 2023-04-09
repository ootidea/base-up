/**
 * @example
 * toNumber('123') returns 123
 * toNumber('123') is typed as 123
 * @example
 * toNumber('-1') returns -1
 * toNumber('-1') is typed as -1
 * @example
 * toNumber('1.0') returns 1
 * toNumber('1.0') is typed as 1
 * @example
 * toNumber('1.00') returns 1
 * toNumber('1.00') is typed as number
 * @example
 * toNumber('1.05') returns 1.05
 * toNumber('1.05') is typed as 1.05
 */
export function toNumber<N extends number>(text: `${N}.0`): N
export function toNumber<N extends number>(text: `${N}`): N
export function toNumber(text: any): number
export function toNumber(text: any): number {
  return Number(text) as any
}

export function toString<T extends string | number | bigint | boolean | null | undefined>(value: T): `${T}`
export function toString(value: any): string
export function toString(value: any): string {
  return String(value)
}

/**
 * A type for enabling automatic completion of specific literals in an editor.
 * Unlike a literal union type, it also accepts values other than the specified literals.
 * https://github.com/sindresorhus/type-fest/blob/main/source/literal-union.d.ts
 */
export type LiteralAutoComplete<Literals extends Base, Base = string> = Literals | (Base & Record<never, never>)
