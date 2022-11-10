/**
 * Utility for defining tagged union types.
 * @example
 * DiscriminatedUnion<{ Rect: { width: number; height: number }; Circle: { radius: number } }>
 * is equivalent to
 * { type: 'Rect'; width: number; height: number } | { type: 'Circle'; radius: number }
 */
export type DiscriminatedUnion<T, K extends keyof T = keyof T> = K extends K ? { type: K } & T[K] : never

export namespace Fct {
  export type UnknownType = { type: 'unknown' }
  export const unknown: UnknownType = { type: 'unknown' }

  export type AnyType = { type: 'any' }
  export const any: AnyType = { type: 'any' }

  export type NeverType = { type: 'never' }
  export const never: NeverType = { type: 'never' }

  export type VoidType = { type: 'void' }
  export const void_: VoidType = { type: 'void' }

  export type NullType = { type: 'null' }
  export const null_: NullType = { type: 'null' }

  export type UndefinedType = { type: 'undefined' }
  export const undefined: UndefinedType = { type: 'undefined' }

  export type BooleanType = { type: 'boolean' }
  export const boolean: BooleanType = { type: 'boolean' }

  export type NumberType = { type: 'number' }
  export const number: NumberType = { type: 'number' }

  export type StringType = { type: 'string' }
  export const string: StringType = { type: 'string' }

  export type RecursionType<K extends keyof any> = { type: 'recursion'; key: K }
  export function recursion<K extends keyof any>(key: K): RecursionType<K> {
    return { type: 'recursion', key }
  }

  export type LiteralType<T> = { type: 'literal'; value: T }
  export function literal<T extends null | undefined | boolean | number | bigint | string | symbol>(
    value: T
  ): LiteralType<T> {
    return { type: 'literal', value }
  }

  export type ObjectType<T extends object> = { type: 'object'; value: T }
  export function object<T extends object>(value: T): ObjectType<T> {
    return { type: 'object', value }
  }

  export type UnionType<T extends readonly any[]> = { type: 'union'; parts: T }
  export function union<T extends readonly any[]>(...parts: T): UnionType<T> {
    return { type: 'union', parts }
  }

  export type IntersectionType<T extends readonly any[]> = { type: 'intersection'; parts: T }
  export function intersection<T extends readonly any[]>(...parts: T): IntersectionType<T> {
    return { type: 'intersection', parts }
  }

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
    : T extends StringType
    ? string
    : T extends RecursionType<infer K>
    ? { [key in K]: Infer<Z> }
    : T extends LiteralType<infer L>
    ? L
    : T extends ObjectType<infer O>
    ? InferObjectType<O, Z>
    : T extends UnionType<infer A>
    ? InferUnionType<A, Z>
    : T extends IntersectionType<infer A>
    ? InferIntersectionType<A, Z>
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
