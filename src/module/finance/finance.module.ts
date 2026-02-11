import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Finance, FinanceSchema } from './schemas/finance.schema'
import { FinanceService } from './finance.service'
import { FinanceController } from './finance.controller'
import { getModuleRedis } from 'src/utils/redis'

@Module({
  imports: [
    getModuleRedis(),
    MongooseModule.forFeature([{ name: Finance.name, schema: FinanceSchema }])
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService]
})
export class FinanceModule { }
