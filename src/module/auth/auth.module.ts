import { Module, Global } from '@nestjs/common'
import { JwtAuthGuard } from './jwt-auth.guard'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JWT_AUTH } from 'src/common/app'

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: JWT_AUTH.secret,
      signOptions: { expiresIn: JWT_AUTH.expiredAccess },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],

})
export class AuthModule { }
