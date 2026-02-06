import { Module } from '@nestjs/common'
import { SecureController } from './Secure.controller'
import { SecureService } from './Secure.service'

@Module({
  controllers: [SecureController],
  providers: [SecureService],
  exports: [SecureService],
})
export class SecureModule { }
