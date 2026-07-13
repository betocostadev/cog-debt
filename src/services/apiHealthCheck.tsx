import { ApiClient } from '#/api'
import type { ApiHealthResponse } from '#/types/queries'

class HealthCheckService extends ApiClient {
  async checkApiHealth(): Promise<ApiHealthResponse> {
    return this.get('/test')
  }
}

export const healthCheckService = new HealthCheckService()
