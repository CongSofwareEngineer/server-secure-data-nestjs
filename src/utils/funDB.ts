import { FilterQuery, Model, PipelineStage, QueryOptions, SortValues, Types } from 'mongoose'
import { getPageLimitSkip } from './function'
import { Query } from '@nestjs/common'

class classFnDB<T> {
  model: Model<T>
  constructor(modelCollection: Model<T>) {
    this.model = modelCollection
  }

  async getOneData(param: QueryOptions): Promise<T | null> {
    try {
      return this.model.findOne(param).exec()
    } catch (error) {
      return null
    }
  }

  async getDataByID(id: string | Types.ObjectId): Promise<T | null> {
    try {
      const data = this.model.findById(id).exec()
      return data
    } catch (error) {
      return null
    }
  }

  async getDataByListID(listId: Types.ObjectId[]): Promise<T[]> {
    try {
      const data = await this.model.find({
        _id: { $in: listId },
      })
      return data
    } catch (error) {
      return null
    }
  }

  async updateData(id: string | Types.ObjectId, body: any): Promise<T | null> {
    try {
      return this.model
        .findByIdAndUpdate(
          id,
          {
            $set: body,
          },
          { new: true },
        )
        .exec()
    } catch (error) {
      console.error('Error updating document:', error)
      return null
    }
  }

  async getSortDataByAggregate(
    @Query() query,
    pipelineStage: PipelineStage[] = [],
    optionSort: Record<string, SortValues> = {},
    noLimit = false,
  ): Promise<T[]> {
    try {
      if (noLimit) {
        return await this.model.aggregate(pipelineStage).exec()
      }
      const { skip, limit } = getPageLimitSkip(query)
      return await this.model.aggregate(pipelineStage).sort(optionSort).skip(skip).limit(limit).exec()
    } catch (error) {
      console.error('Error sorting and aggregating data:', error)
      return []
    }
  }

  async getFullDataByOption(queryOption: FilterQuery<T> = {}): Promise<T[]> {
    try {
      return await this.model.find(queryOption).exec()
    } catch (error) {
      console.error('Error getting full data by option:', error)
      return []
    }
  }

  async deleteDataByID(id: Types.ObjectId): Promise<T | null> {
    try {
      if (!Types.ObjectId.isValid(id)) return null
      return await this.model.findByIdAndDelete(id, { new: true }).exec()
    } catch (error) {
      console.error('Error deleting document:', error)
      return null
    }
  }

  async deleteManyData(filter: FilterQuery<T> = {}): Promise<boolean> {
    try {
      await this.model.deleteMany(filter).exec()
      return true
    } catch (error) {
      console.error('Error deleting many documents:', error)
      return false
    }
  }

  async create(data: any): Promise<T | null> {
    try {
      return this.model.create(data)
    } catch (error) {
      console.error('Error creating document:', error)
      return null
    }
  }

  async getDataByAggregate(@Query() query, pipelineStage: PipelineStage[] = [], noLimit = false): Promise<T[]> {
    try {
      if (noLimit) {
        return this.model.aggregate(pipelineStage).exec()
      }
      const { skip, limit } = getPageLimitSkip(query)
      return this.model.aggregate(pipelineStage).skip(skip).limit(limit).exec()
    } catch (error) {
      console.error('Error in aggregate query:', error)
      return []
    }
  }
}

export default classFnDB
