export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout> | null = null

  return function debounced(this: unknown, ...args: Parameters<T>): void {
    if (timerId) clearTimeout(timerId)

    timerId = setTimeout((): void => {
      fn.apply(this, args)
    }, delay)
  }
}
