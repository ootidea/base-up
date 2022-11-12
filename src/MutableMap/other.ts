export function update<K, T>(self: Map<K, T>, key: K, f: (_: T | undefined) => T): Map<K, T> {
  self.set(key, f(self.get(key)))
  return self
}
