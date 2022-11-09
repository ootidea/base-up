/**
 * Utility for defining tagged union types.
 * @example
 * DiscriminatedUnion<{ Rect: { width: number; height: number }; Circle: { radius: number } }>
 * is equivalent to
 * { type: 'Rect'; width: number; height: number } | { type: 'Circle'; radius: number }
 */
export type DiscriminatedUnion<T, K extends keyof T = keyof T> = K extends K ? { type: K } & T[K] : never

type BooleanType = { type: 'boolean' }
export const boolean: BooleanType = { type: 'boolean' }

type NumberType = { type: 'number' }
export const number: NumberType = { type: 'number' }

type StringType = { type: 'string' }
export const string: StringType = { type: 'string' }

type LiteralType<T> = { type: 'literal'; value: T }
export function literal<T extends null | undefined | boolean | number | bigint | string | symbol>(
  value: T
): LiteralType<T> {
  return { type: 'literal', value }
}

type ObjectType<T> = { type: 'object'; values: T }
export function object<T>(values: T): ObjectType<T> {
  return { type: 'object', values }
}

/**
 * @example
 * Infer<typeof number> is equivalent to number
 * Infer<NumberType> is equivalent to number
 * Infer<typeof object({})> is equivalent to {}
 */
export type Infer<T> = T extends BooleanType
  ? boolean
  : T extends NumberType
  ? number
  : T extends StringType
  ? string
  : T extends LiteralType<infer L>
  ? L
  : T extends ObjectType<infer O>
  ? InferEachValue<O>
  : never
type InferEachValue<T> = {
  [K in keyof T]: Infer<T[K]>
}

type AdtConstructors<T> = { [K in keyof T]: (_: T[K]) => { type: K } & T[K] }

export function adtConstructors<T extends ObjectType<O>, O>(schema: T): AdtConstructors<Infer<T>> {
  return Object.fromEntries(
    Object.keys(schema.values as any).map((ctorName) => {
      return [ctorName, (argPack: any) => ({ type: ctorName, ...argPack })]
    })
  ) as any
}

type AdtCase<T> = <R>(value: DiscriminatedUnion<T>, caseObject: { [K in keyof T]: (_: T[K]) => R }) => R

export function adtCaseFunction<T>(schema: T): AdtCase<Infer<T>> {
  return ((value: DiscriminatedUnion<Infer<T>>, caseObject: any) => {
    return caseObject[value.type](value)
  }) as any
}
