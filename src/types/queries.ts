export interface BaseResult {
  isLoading: boolean
  error: Error | undefined
  refresh: () => Promise<void>
}

export type ApiHealthResponse = {
  status: string
  method: string
}
