import { Tail } from '../Array/type'

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
