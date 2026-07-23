import { ApiClient } from '#/api'
import type { ApiHealthResponse } from '#/types/queries'

/*
User Dummy JSON for API health check
*/
class HealthCheckService extends ApiClient {
  async checkApiHealth(): Promise<ApiHealthResponse> {
    return this.get('/test')
  }
}

export const healthCheckService = new HealthCheckService()
