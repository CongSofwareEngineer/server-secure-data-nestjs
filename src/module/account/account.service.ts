import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Account, AccountDocument } from './schemas/account.schema'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>
  ) { }

  async create(data: Partial<Account>): Promise<Account | null> {

    return await FunService.create(this.accountModel, data)
  }

  async findAll(query: any) {
    try {

      const data = await FunService.getDataByOptions(this.accountModel, query)

      return { data }
    } catch (error) {
      console.error('Error finding all Accounts:', error)

      return { data: [] }
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
