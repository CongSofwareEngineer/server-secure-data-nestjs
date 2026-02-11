import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Account, AccountDocument } from './schemas/account.schema'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { REDIS_KEY } from 'src/common/redis'

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async create(data: Partial<Account>): Promise<Account | null> {

    return await FunService.create(this.accountModel, data)
  }

  async findAll(query: any) {
    try {
      const cacheKey = `${REDIS_KEY.Account}:${JSON.stringify(query)}`

      // Try to get from cache
      const cachedData = await this.cacheManager.get<Account[]>(cacheKey)

      if (cachedData) {
        return cachedData
      }
      const { data, pagination } = await FunService.getDataByOptionsWithPagination(this.accountModel, query)

      return { data, pagination }
    } catch (error) {
      console.error('Error finding all Accounts:', error)

      return { data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } }
    }
  }

  async findOne(id: string): Promise<Account | null> {
    try {

      return await FunService.findDataByID(this.accountModel, getIdObject(id))
    } catch (error) {
      console.error('Error finding Account by ID:', error)

      return null
    }
  }

  async update(id: string, updateData: Partial<Account>): Promise<Account | null> {
    try {

      return await FunService.updateData(this.accountModel, getIdObject(id), updateData)
    } catch (error) {
      console.error('Error updating Account:', error)

      return null
    }
  }

  async remove(id: string): Promise<Account | null> {
    try {

      return await FunService.deleteDataByID(this.accountModel, getIdObject(id))
    } catch (error) {
      console.error('Error deleting Account:', error)

      return null
    }
  }
}
