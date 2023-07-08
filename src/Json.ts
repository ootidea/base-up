export type JsonValue = null | boolean | number | string | JsonArray | JsonObject
export interface JsonArray extends Array<JsonValue> {}
export interface JsonObject {
  [key: string]: JsonValue
}
