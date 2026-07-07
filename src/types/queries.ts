export interface BaseResult {
  isLoading: boolean
  error: Error | undefined
  refresh: () => Promise<void>
}
