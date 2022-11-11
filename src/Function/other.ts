import { Tail } from '../Array/type'
import { Tuple } from '../other'

export function curry<F extends (..._: any) => any>(
  f: F
): (a: Parameters<F>[0]) => (...bs: Tail<Parameters<F>>) => ReturnType<F> {
  return (a: Parameters<F>[0]) =>
    (...bs: Tail<Parameters<F>>) =>
      f(a, ...bs)
}

export function apply1<F extends (..._: any) => any>(
  f: F,
  a: Parameters<F>[0]
): (...bs: Tail<Parameters<F>>) => ReturnType<F> {
  return curry(f)(a)
}

export function call<T>(f: () => T): T {
  return f()
}

export function id<T>(value: T): T {
  return value
}

export function returnLast<T extends Tuple>(...args: T): T extends readonly [...any, infer L] ? L : undefined {
  return args[args.length - 1] as any
}
