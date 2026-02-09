import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

import { DB_NAME } from './common/mongoDB'
import { LoggerMiddleware } from './logger.middleware'

import { CustomThrottlerGuard } from './module/CustomThrottlerGuard'
import { HealthModule } from './module/health/health.module'
import { AuthModule } from './module/auth/auth.module'
import { UserModule } from './module/user/user.module'
import { AccountModule } from './module/account/account.module'
import { FinanceModule } from './module/finance/finance.module'


export const throttlerOptions = {
  throttlers: [
    {
      name: 'short',
      ttl: 1000,    // 1 second
      limit: 5,     // 5 requests
    },
    {
      name: 'long',
      ttl: 60000,   // 1 minute
      limit: 50,    // 50 requests
    },
  ],
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.test.local', // Fallback to standard .env
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
      `mongodb+srv://${process.env.USER_NAME_MONGO}:${process.env.PASSWORD_MONGO}@tc-store-admin.mpkyxqj.mongodb.net/?retryWrites=true&w=majority&appName=tc-store-admin`,
      {
        dbName: DB_NAME,
        enableUtf8Validation: true,
      },
    ),
    AuthModule,
    HealthModule,
    UserModule,
    AccountModule,
    FinanceModule,

    ThrottlerModule.forRoot(throttlerOptions.throttlers),

  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/*')
  }
}
