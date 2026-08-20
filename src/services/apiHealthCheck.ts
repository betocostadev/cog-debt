import { ApiClient } from '#/api'
import { ServerError } from '#/types/errors'
import type { ApiHealthResponse } from '#/types/queries'

/*
User Dummy JSON for API health check
*/
class HealthCheckService extends ApiClient {
  async checkApiHealth(): Promise<ApiHealthResponse> {
    try {
      return this.get('/test')
    } catch (error) {
      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }
}

export const healthCheckService = new HealthCheckService()
