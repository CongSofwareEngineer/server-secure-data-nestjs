import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Finance, FinanceDocument } from './schemas/finance.schema'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'

@Injectable()
export class FinanceService {
  constructor(
    @InjectModel(Finance.name) private financeModel: Model<FinanceDocument>
  ) { }

  async create(data: Partial<Finance>): Promise<Finance | null> {


    return await FunService.create(this.financeModel, data)
  }

  async findAll(query: any) {
    try {


      const data = await FunService.getDataByOptions(this.financeModel, query)

      return { data }
    } catch (error) {
      console.error('Error finding all Finance records:', error)

      return { data: [] }
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
