import { AccurateTuple } from './Array/type'
import { PseudoAny } from './other'

/**
 * Utility for defining tagged union types.
 * @example
 * DiscriminatedUnion<{ Rect: { width: number; height: number }; Circle: { radius: number } }>
 * is equivalent to
 * { type: 'Rect'; width: number; height: number } | { type: 'Circle'; radius: number }
 */
export type DiscriminatedUnion<T, K extends keyof T = keyof T> = K extends K ? { type: K } & T[K] : never

export namespace Fct {
  export const unknown = { type: 'unknown' } as const
  export type UnknownType = typeof unknown

  export const any = { type: 'any' } as const
  export type AnyType = typeof any

  export const never = { type: 'never' } as const
  export type NeverType = typeof never

  export const void_ = { type: 'void' } as const
  export type VoidType = typeof void_

  export const null_ = { type: 'null' } as const
  export type NullType = typeof null_

  export const undefined = { type: 'undefined' } as const
  export type UndefinedType = typeof undefined

  export const boolean = { type: 'boolean' } as const
  export type BooleanType = typeof boolean

  export const number = { type: 'number' } as const
  export type NumberType = typeof number

  export const bigint = { type: 'bigint' } as const
  export type BigintType = typeof bigint

  export const string = { type: 'string' } as const
  export type StringType = typeof string

  export const symbol = { type: 'symbol' } as const
  export type SymbolType = typeof symbol

  export function literal<T extends PseudoAny>(value: T) {
    return { type: 'literal', value } as const
  }
  export type LiteralType<T extends PseudoAny> = ReturnType<typeof literal<T>>

  export function array<T>(value: T) {
    return { type: 'array', value } as const
  }
  export type ArrayType<T> = ReturnType<typeof array<T>>

  export function object<T extends object>(value: T) {
    return { type: 'object', value } as const
  }
  export type ObjectType<T extends object> = ReturnType<typeof object<T>>

  export function union<T extends AccurateTuple>(...parts: T) {
    return { type: 'union', parts } as const
  }
  export type UnionType<T extends AccurateTuple> = ReturnType<typeof union<T>>

  export function intersection<T extends AccurateTuple>(...parts: T) {
    return { type: 'intersection', parts } as const
  }
  export type IntersectionType<T extends AccurateTuple> = ReturnType<typeof intersection<T>>

  export function recursion<K extends keyof any>(key: K) {
    return { type: 'recursion', key } as const
  }
  export type RecursionType<K extends keyof any> = ReturnType<typeof recursion<K>>

  /**
   * @example
   * Infer<typeof number> is equivalent to number
   * Infer<NumberType> is equivalent to number
   * Infer<typeof object({})> is equivalent to {}
   */
  export type Infer<T, Z = T> = T extends UnknownType
    ? unknown
    : T extends AnyType
    ? any
    : T extends NeverType
    ? never
    : T extends VoidType
    ? void
    : T extends NullType
    ? null
    : T extends UndefinedType
    ? undefined
    : T extends BooleanType
    ? boolean
    : T extends NumberType
    ? number
    : T extends BigintType
    ? bigint
    : T extends StringType
    ? string
    : T extends SymbolType
    ? symbol
    : T extends LiteralType<infer L>
    ? L
    : T extends ArrayType<infer U>
    ? Infer<U, Z>[]
    : T extends ObjectType<infer O>
    ? InferObjectType<O, Z>
    : T extends UnionType<infer A>
    ? InferUnionType<A, Z>
    : T extends IntersectionType<infer A>
    ? InferIntersectionType<A, Z>
    : T extends RecursionType<infer K>
    ? { [key in K]: Infer<Z> }
    : never
  type InferObjectType<T, Z> = {
    [K in keyof T]: Infer<T[K], Z>
  }
  type InferUnionType<T extends readonly any[], Z> = T extends readonly [infer H, ...infer R]
    ? Infer<H, Z> | InferUnionType<R, Z>
    : never
  type InferIntersectionType<T extends readonly any[], Z> = T extends readonly [infer H, ...infer R]
    ? Infer<H, Z> & InferUnionType<R, Z>
    : unknown
}

type AdtConstructors<T> = { [K in keyof T]: (_: T[K]) => { type: K } & T[K] }

export function adtConstructors<T extends Fct.ObjectType<O>, O extends object>(
  schema: T
): AdtConstructors<Fct.Infer<T>> {
  return Object.fromEntries(
    Object.keys(schema.value as any).map((ctorName) => {
      return [ctorName, (argPack: any) => ({ type: ctorName, ...argPack })]
    })
  ) as any
}

type AdtCase<T> = <R>(value: DiscriminatedUnion<T>, caseObject: { [K in keyof T]: (_: T[K]) => R }) => R

export function adtCaseFunction<T>(schema: T): AdtCase<Fct.Infer<T>> {
  return ((value: DiscriminatedUnion<Fct.Infer<T>>, caseObject: any) => {
    return caseObject[value.type](value)
  }) as any
}
