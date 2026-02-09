import { Query } from '@nestjs/common'
import { QueryOptions } from 'mongoose'
import { FilterQuery, Model, PipelineStage, SortValues, Types } from 'mongoose'
import { getPageLimitSkip } from 'src/utils/function'

export class FunService {
  private static async performQuery<T>(
    model: Model<T>,
    queryOption: FilterQuery<T>,
    options: QueryOptions<T> = {},
    sort?: Record<string, SortValues>,
    pageLimitSkip?: { skip: number; limit: number },
  ): Promise<T[]> {
    const query = model.find(queryOption, options)
    if (sort) query.sort(sort)
    if (pageLimitSkip) {
      query.skip(pageLimitSkip.skip).limit(pageLimitSkip.limit)
    }
    return query.exec()
  }

  static async create<T>(model: Model<T>, data: any): Promise<T | null> {
    try {
      return await model.create(data)
    } catch (error) {
      console.error('Error creating document:', error)
      return null
    }
  }

  static async deleteDataByID<T>(model: Model<T>, id: Types.ObjectId): Promise<T | null> {
    try {
      if (!Types.ObjectId.isValid(id)) return null
      return await model.findByIdAndDelete(id, { new: true }).exec()
    } catch (error) {
      console.error('Error deleting document:', error)
      return null
    }
  }

  static async deleteManyData<T>(model: Model<T>, filter: FilterQuery<T> = {}): Promise<boolean> {
    try {
      await model.deleteMany(filter).exec()
      return true
    } catch (error) {
      console.error('Error deleting many documents:', error)
      return false
    }
  }

  static async findDataByID<T>(model: Model<T>, id: string | Types.ObjectId): Promise<T | null> {
    try {
      const data = await model.findById(id).exec()
      return data
    } catch (error) {
      return null
    }
  }

  static async getFullDataByOption<T>(model: Model<T>, queryOption: FilterQuery<T> = {}): Promise<T[]> {
    try {
      return await model.find(queryOption).exec()
    } catch (error) {
      console.error('Error getting full data by option:', error)
      return []
    }
  }

  static async getOneData<T>(model: Model<T>, param: QueryOptions, key: string = 'id'): Promise<T | null> {
    try {
      return model.findOne(param).exec()
    } catch (error) {
      return null
    }
  }

  static async getDataByID<T>(model: Model<T>, id: Types.ObjectId, @Query() query): Promise<T> {
    try {
      return await model.findById(id).exec()
    } catch (error) {
      return null
    }
  }

  static async getDataByListID<T>(model: Model<T>, listId: string[], @Query() query, noLimit = false): Promise<T[]> {
    try {
      if (noLimit) {
        return await model.find({ _id: { $in: listId } }).exec()
      }
      const { skip, limit } = getPageLimitSkip(query)
      return await model
        .find({ _id: { $in: listId } })
        .skip(skip)
        .limit(limit)
        .exec()
    } catch (error) {
      console.error('Error getting data by list of IDs:', error)
      return []
    }
  }

  static async getDataByOptions<T>(
    model: Model<T>,
    @Query() query,
    queryOption: FilterQuery<T> = {},
    options: QueryOptions<T> = {},
    optionsSort: Record<string, SortValues> = {},
    noLimit = false,
  ): Promise<T[]> {
    try {
      if (noLimit) {
        return this.performQuery(model, queryOption, options, optionsSort)
      }
      const { skip, limit } = getPageLimitSkip(query)
      return this.performQuery(model, queryOption, options, optionsSort, { skip, limit })
    } catch (error) {
      console.error('Error getting data by options:', error)
      return []
    }
  }

  static async getDataByAggregate<T>(
    model: Model<T>,
    @Query() query,
    pipelineStage: PipelineStage[] = [],
    noLimit = false,
  ): Promise<T[]> {
    try {
      if (noLimit) {
        return await model.aggregate(pipelineStage).exec()
      }
      const { skip, limit } = getPageLimitSkip(query)
      return await model.aggregate(pipelineStage).skip(skip).limit(limit).exec()
    } catch (error) {
      console.error('Error in aggregate query:', error)
      return []
    }
  }

  static async getSortDataByAggregate<T>(
    model: Model<T>,
    @Query() query,
    pipelineStage: PipelineStage[] = [],
    optionSort: Record<string, SortValues> = {},
    noLimit = false,
  ): Promise<T[]> {
    try {
      if (noLimit) {
        return await model.aggregate(pipelineStage).exec()
      }
      const { skip, limit } = getPageLimitSkip(query)
      return await model.aggregate(pipelineStage).sort(optionSort).skip(skip).limit(limit).exec()
    } catch (error) {
      console.error('Error sorting and aggregating data:', error)
      return []
    }
  }

  static async getFullDataByAggregate<T>(model: Model<T>, pipelineStage?: PipelineStage[]): Promise<T[]> {
    try {
      const data = await model.aggregate(pipelineStage).exec()
      return data
    } catch (error) {
      return []
    }
  }

  static async getAndSortDataByOptions<T>(
    model: Model<T>,
    @Query() query,
    queryOption: FilterQuery<T> = {},
    options: QueryOptions<T> = {},
    optionsSort: Record<string, SortValues> = {},
    noLimit = false,
  ): Promise<T[]> {
    try {
      if (noLimit) {
        return this.performQuery(model, queryOption, options, optionsSort)
      }
      const { skip, limit } = getPageLimitSkip(query)
      return this.performQuery(model, queryOption, options, optionsSort, { skip, limit })
    } catch (error) {
      console.error('Error getting and sorting data by options:', error)
      return []
    }
  }

  static async getFullDataByID<T>(model: Model<T>, id: string | Types.ObjectId): Promise<T> {
    try {
      return model.findById(id).exec()
    } catch (error) {
      return null
    }
  }

  static async getDataByLimit<T>(
    model: Model<T>,
    @Query() query,
    querySort: Record<string, SortValues> = {},
  ): Promise<T[]> {
    try {
      const { skip, limit } = getPageLimitSkip(query)
      return await model.find().skip(skip).limit(limit).sort(querySort).exec()
    } catch (error) {
      console.error('Error getting data by limit:', error)
      return []
    }
  }

  static async updateData<T>(model: Model<T>, id: string | Types.ObjectId, body: any): Promise<T | null> {
    try {
      return await model
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
}
