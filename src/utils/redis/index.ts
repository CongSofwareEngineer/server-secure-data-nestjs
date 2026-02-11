import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-store'

export const getModuleRedis = (minutes: number = 15) => {
  return CacheModule.register({
    store: redisStore,
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    ttl: minutes * 60 * 1000, // 5 minutes in milliseconds
  })
}