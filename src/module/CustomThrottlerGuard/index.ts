import { ExecutionContext, Injectable } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // KIỂM TRA: Nếu là 'telegraf' (Telegram) thì cho qua luôn, không check throttling
    if (context.getType() as string === 'telegraf') {
      return true
    }

    // Nếu là HTTP thông thường thì chạy logic cũ
    return super.canActivate(context)
  }
}