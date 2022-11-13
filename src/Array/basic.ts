export function filter<T, U extends T>(self: readonly T[], f: (_: T) => _ is U): readonly U[]
export function filter<T>(self: readonly T[], f: (_: T) => boolean): readonly T[]
export function filter<T>(self: readonly T[], f: (_: T) => boolean): readonly T[] {
  return self.filter(f) as any
}
