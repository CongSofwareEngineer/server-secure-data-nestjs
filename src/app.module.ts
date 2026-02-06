import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from './logger.middleware'
import { SecureModule } from './module/Secure/secure.module'
import { HealthModule } from './module/health/health.module'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.test.local', // Fallback to standard .env
    }),

    HealthModule,
    SecureModule,

  ],

  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/*')
  }
}
