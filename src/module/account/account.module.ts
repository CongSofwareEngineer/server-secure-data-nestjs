import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Account, AccountSchema } from './schemas/account.schema'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { getModuleRedis } from 'src/utils/redis'

@Module({
  imports: [
    getModuleRedis(),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule { }
