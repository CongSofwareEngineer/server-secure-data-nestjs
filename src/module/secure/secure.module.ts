import { Module } from '@nestjs/common'
import { SecureController } from './secure.controller'
import { SecureService } from './secure.service'

@Module({
  controllers: [SecureController],
  providers: [SecureService],
  exports: [SecureService],
})
export class SecureModule { }
