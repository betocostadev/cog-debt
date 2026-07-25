type AnyFn = (...args: any[]) => void

export function throttle<T extends AnyFn>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0

  return function throttled(this: unknown, ...args) {
    const now = Date.now()

    // Changed a bit because of state changes that can reset the time
    if (lastCall === 0 || now - lastCall >= delay) {
      lastCall = now
      fn.apply(this, args)
    }
  }
}
