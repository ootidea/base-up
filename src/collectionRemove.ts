export function removeAt<T>(self: readonly T[], i: number): readonly T[] {
  const cloned = self.slice()
  cloned.splice(i, 1)
  return cloned
}
