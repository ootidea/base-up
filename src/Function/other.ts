import { AccurateTuple } from '../Array/type'

export function curry<H, L extends AccurateTuple, R>(f: (h: H, ...l: L) => R): (a: H) => (...bs: L) => R {
  return (h: H) =>
    (...l: L) =>
      f(h, ...l)
}

export function apply1<H, L extends AccurateTuple, R>(f: (h: H, ...l: L) => R, h: H): (...l: L) => R {
  return curry(f)(h)
}

export function call<T>(f: () => T): T {
  return f()
}

export function id<T>(value: T): T {
  return value
}

export function returnLast<T extends AccurateTuple>(...args: T): T extends readonly [...any, infer L] ? L : undefined {
  return args[args.length - 1] as any
}
