/** Function with improved type of Object.fromEntries. */
export function fromEntries<T extends readonly [any, any]>(entries: Iterable<T>): Record<T[0], T[1]> {
  return Object.fromEntries(entries) as any
}
