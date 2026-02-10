import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    // const authorization = request.cookies?.tokenAccess || ''
    const authorization = request.headers?.authorization || ''


    if (!authorization) {
      throw new UnauthorizedException('Missing authorization header')
    }

    const payload = this.authService.verifyAth(authorization)

    if (!payload) {
      throw new UnauthorizedException('Invalid or expired token')
    }

    // Attach user payload to request for use in controllers
    request.user = payload

    return true
  }
}
