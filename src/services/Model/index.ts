import { Query } from '@nestjs/common'
import { Model, QueryOptions } from 'mongoose'
import { FilterQuery, PipelineStage, SortValues, Types } from 'mongoose'
import { getPageLimitSkip } from 'src/utils/function'
import SessionService from '../Session'

class ModelService<T> {
  private readonly model: Model<T>
  private readonly session: SessionService<T>

  constructor(model: any) {
    this.model = model
    this.session = new SessionService(model)
  }

  private async performQuery(
    queryOption: FilterQuery<T>,
    options: QueryOptions<T> = {},
    sort?: Record<string, SortValues>,
    pageLimitSkip?: { skip: number; limit: number },
  ): Promise<T[]> {
    const query = this.model.find(queryOption, options)
    if (sort) query.sort(sort)
    if (pageLimitSkip) {
      query.skip(pageLimitSkip.skip).limit(pageLimitSkip.limit)
    }
    return query.exec()
  }

  async create(data: any): Promise<T[] | null> {
    try {
      await this.session.startSession()
      const res = await this.model.create(data, { session: this.session.getSession() })

      return res
    } catch (error) {
      console.error('Error creating document:', error)
      await this.session.abortSession()
      return null
    } finally {
      await this.session.endSession()
    }
  }

  async deleteDataByID(id: Types.ObjectId): Promise<T | null> {
    try {
      await this.session.startSession()
      if (!Types.ObjectId.isValid(id)) return null
      const res = await this.model.findByIdAndDelete(id, { new: true, session: this.session.getSession() }).exec()
      return res
    } catch (error) {
      await this.session.abortSession()
      console.error('Error deleting document:', error)
      return null
    } finally {
      await this.session.endSession()
    }
  }

  async deleteManyData(filter: FilterQuery<T> = {}): Promise<boolean> {
    try {
      await this.session.startSession()
      await this.model.deleteMany(filter).exec()
      return true
    } catch (error) {
      await this.session.abortSession()
      console.error('Error deleting many documents:', error)
      return false
    } finally {
      await this.session.endSession()
    }
  }

  async findDataByID(id: string | Types.ObjectId): Promise<T | null> {
    try {
      const data = await this.model.findById(id).exec()
      return data
    } catch (error) {
      return null
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

  async getOneData(param: QueryOptions): Promise<T | null> {
    try {
      return this.model.findOne(param).exec()
    } catch (error) {
      return null
    }
  }

  async getDataByID(id: Types.ObjectId): Promise<T> {
    try {
      return await this.model.findById(id).exec()
    } catch (error) {
      return null
    }
  }

  async getDataByListID(listId: string[], @Query() query, noLimit = false): Promise<T[]> {
    try {
      if (noLimit) {
        return await this.model.find({ _id: { $in: listId } }).exec()
      }
      const { skip, limit } = getPageLimitSkip(query)
      return await this.model
        .find({ _id: { $in: listId } })
        .skip(skip)
        .limit(limit)
        .exec()
    } catch (error) {
      console.error('Error getting data by list of IDs:', error)
      return []
    }
  }

  async getDataByOptions(
    @Query() query,
    queryOption: FilterQuery<T> = {},
    options: QueryOptions<T> = {},
    optionsSort: Record<string, SortValues> = {},
    noLimit = false,
  ): Promise<T[]> {
    try {
      if (noLimit) {
        return this.performQuery(queryOption, options, optionsSort)
      }
      const { skip, limit } = getPageLimitSkip(query)
      return this.performQuery(queryOption, options, optionsSort, { skip, limit })
    } catch (error) {
      console.error('Error getting data by options:', error)
      return []
    }
  }

  async getDataByAggregate(@Query() query, pipelineStage: PipelineStage[] = [], noLimit = false): Promise<T[]> {
    try {
      if (noLimit) {
        return await this.model.aggregate(pipelineStage).exec()
      }
      const { skip, limit } = getPageLimitSkip(query)
      return await this.model.aggregate(pipelineStage).skip(skip).limit(limit).exec()
    } catch (error) {
      console.error('Error in aggregate query:', error)
      return []
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

  async getFullDataByAggregate(pipelineStage?: PipelineStage[]): Promise<T[]> {
    try {
      const data = await this.model.aggregate(pipelineStage).exec()
      return data
    } catch (error) {
      return []
    }
  }

  async getAndSortDataByOptions(
    @Query() query,
    queryOption: FilterQuery<T> = {},
    options: QueryOptions<T> = {},
    optionsSort: Record<string, SortValues> = {},
    noLimit = false,
  ): Promise<T[]> {
    try {
      if (noLimit) {
        return this.performQuery(queryOption, options, optionsSort)
      }
      const { skip, limit } = getPageLimitSkip(query)
      return this.performQuery(queryOption, options, optionsSort, { skip, limit })
    } catch (error) {
      console.error('Error getting and sorting data by options:', error)
      return []
    }
  }

  async getFullDataByID(id: string | Types.ObjectId): Promise<T> {
    try {
      return this.model.findById(id).exec()
    } catch (error) {
      return null
    }
  }

  async getDataByLimit(@Query() query, querySort: Record<string, SortValues> = {}): Promise<T[]> {
    try {
      const { skip, limit } = getPageLimitSkip(query)
      return await this.model.find().skip(skip).limit(limit).sort(querySort).exec()
    } catch (error) {
      console.error('Error getting data by limit:', error)
      return []
    }
  }

  async updateData(id: string | Types.ObjectId, body: T): Promise<T | null> {
    try {
      await this.session.startSession()
      const res = await this.model
        .findByIdAndUpdate(
          id,
          {
            $set: body,
          },
          { new: true, session: this.session.getSession() },
        )
        .exec()

      return res
    } catch (error) {
      await this.session.abortSession()
      console.error('Error updating document:', error)
      return null
    } finally {
      await this.session.endSession()
    }
  }
}

export default ModelService
