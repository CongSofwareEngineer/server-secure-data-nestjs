import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Finance, FinanceDocument, FinanceStatus } from './schemas/finance.schema'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { REDIS_KEY } from 'src/common/redis'
import { Cache } from 'cache-manager'

@Injectable()
export class FinanceService {
  constructor(
    @InjectModel(Finance.name) private financeModel: Model<FinanceDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async getUsdRemaining(): Promise<{ usdRemaining: number; totalDeposit: number; totalWithdraw: number }> {
    try {
      const [result] = await this.financeModel
        .aggregate<{
          _id: null
          totalDeposit: number
          totalWithdraw: number
          usdRemaining: number
        }>([
          {
            $group: {
              _id: null,
              totalDeposit: {
                $sum: {
                  $cond: [{ $eq: ['$status', FinanceStatus.Deposit] }, '$usdAmount', 0],
                },
              },
              totalWithdraw: {
                $sum: {
                  $cond: [{ $eq: ['$status', FinanceStatus.Withdraw] }, '$usdAmount', 0],
                },
              },
            },
          },
          {
            $addFields: {
              usdRemaining: { $subtract: ['$totalDeposit', '$totalWithdraw'] },
            },
          },
        ])
        .exec()

      return {
        usdRemaining: result?.usdRemaining ?? 0,
        totalDeposit: result?.totalDeposit ?? 0,
        totalWithdraw: result?.totalWithdraw ?? 0,
      }
    } catch (error) {
      console.error('Error calculating USD remaining:', error)

      return { usdRemaining: 0, totalDeposit: 0, totalWithdraw: 0 }
    }
  }

  async create(data: Partial<Finance>): Promise<Finance | null> {


    return await FunService.create(this.financeModel, data)
  }

  async findAll(query: any) {
    try {
      const cacheKey = `${REDIS_KEY.Finance}:${JSON.stringify(query)}`

      // Try to get from cache
      const cachedData = await this.cacheManager.get<Finance[]>(cacheKey)

      if (cachedData) {
        return cachedData
      }

      const { data, pagination } = await FunService.getDataByOptionsWithPagination(this.financeModel, query)

      return { data, pagination }
    } catch (error) {
      console.error('Error finding all Finance records:', error)

      return { data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } }
    }
  }

  async findOne(id: string): Promise<Finance | null> {
    try {


      return await FunService.findDataByID(this.financeModel, getIdObject(id))
    } catch (error) {
      console.error('Error finding Finance record by ID:', error)

      return null
    }
  }

  async update(id: string, updateData: Partial<Finance>): Promise<Finance | null> {
    try {


      return await FunService.updateData(this.financeModel, getIdObject(id), updateData)
    } catch (error) {
      console.error('Error updating Finance record:', error)

      return null
    }
  }

  async remove(id: string): Promise<Finance | null> {
    try {


      return await FunService.deleteDataByID(this.financeModel, getIdObject(id))
    } catch (error) {
      console.error('Error deleting Finance record:', error)

      return null
    }
  }
}
