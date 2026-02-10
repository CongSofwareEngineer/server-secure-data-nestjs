import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AccountCloud, AccountCloudSchema } from './schemas/accountCloud.schema'
import { AccountCloudService } from './accountCloud.service'
import { AccountCloudController } from './accountCloud.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AccountCloud.name, schema: AccountCloudSchema }]),
  ],
  controllers: [AccountCloudController],
  providers: [AccountCloudService],
  exports: [AccountCloudService],
})
export class AccountCloudModule { }

