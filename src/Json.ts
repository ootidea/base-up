export type JsonValue = null | boolean | number | string | JsonValueArray | JsonValueObject
interface JsonValueArray extends Array<JsonValue> {}
interface JsonValueObject {
  [key: string]: JsonValue
}

/**
 * A superset of {@link JsonValue}.
 * It includes types undefined, bigint, and symbol.
 * Keys for objects can be of type number and symbol.
 * Just like JSON, it does not include function and class types.
 */
export type PlainValue =
  | null
  | undefined
  | boolean
  | number
  | bigint
  | string
  | symbol
  | PlainValueArray
  | PlainValueObject
interface PlainValueArray extends Array<PlainValue> {}
interface PlainValueObject {
  [key: string | number | symbol]: PlainValue
}
