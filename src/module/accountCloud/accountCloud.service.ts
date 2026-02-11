import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'
import { AccountCloud, AccountCloudDocument } from './schemas/accountCloud.schema'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { REDIS_KEY } from 'src/common/redis'

@Injectable()
export class AccountCloudService {
  constructor(
    @InjectModel(AccountCloud.name) private accountCloudModel: Model<AccountCloudDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async create(data: Partial<AccountCloud>): Promise<AccountCloud | null> {
    if (!data.userName || !data.password) {
      throw new BadRequestException('All fields (userName, password) are required')
    }

    const existing = await this.findByUserName(data.userName)

    if (existing) {
      throw new BadRequestException('userName already exists')
    }

    return await FunService.create(this.accountCloudModel, data)
  }

  async findAll(query: any) {
    try {
      const cacheKey = `${REDIS_KEY.AccountCloud}:${JSON.stringify(query)}`

      // Try to get from cache
      const cachedData = await this.cacheManager.get<AccountCloud[]>(cacheKey)

      if (cachedData) {
        return cachedData
      }
      const { data, pagination } = await FunService.getDataByOptionsWithPagination(this.accountCloudModel, query)

      return { data, pagination }
    } catch (error) {
      console.error('Error finding all AccountCloud records:', error)

      return { data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } }
    }
  }

  async findOne(id: string): Promise<AccountCloud | null> {
    try {
      return await FunService.findDataByID(this.accountCloudModel, getIdObject(id))
    } catch (error) {
      console.error('Error finding AccountCloud by ID:', error)

      return null
    }
  }

  async findByUserName(userName: string): Promise<AccountCloudDocument | null> {
    try {
      return await this.accountCloudModel.findOne({ userName }).exec()
    } catch (error) {
      console.error('Error finding AccountCloud by userName:', error)

      return null
    }
  }

  async update(id: string, updateData: Partial<AccountCloud>): Promise<AccountCloud | null> {
    try {
      if (updateData.userName) {
        const existing = await this.findByUserName(updateData.userName)

        if (existing && existing._id?.toString() !== id) {
          throw new BadRequestException('userName already exists')
        }
      }

      return await FunService.updateData(this.accountCloudModel, getIdObject(id), updateData)
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      console.error('Error updating AccountCloud:', error)

      return null
    }
  }

  async remove(id: string): Promise<AccountCloud | null> {
    try {
      return await FunService.deleteDataByID(this.accountCloudModel, getIdObject(id))
    } catch (error) {
      console.error('Error deleting AccountCloud:', error)

      return null
    }
  }

}
