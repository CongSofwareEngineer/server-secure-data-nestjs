import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('Health')
@Controller()
export class HealthController {
  @ApiOperation({ summary: 'Check service health status' })
  @Get('ping')
  ping() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Service is alive',
    }
  }
}
