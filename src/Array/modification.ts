export function removeAt<T>(array: readonly T[], i: number): readonly T[] {
  const cloned = array.slice()
  cloned.splice(i, 1)
  return cloned
}
