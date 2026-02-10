import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'
import { AuthService } from '../auth/auth.service'
import { compareData, hashData } from 'src/utils/hash'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService
  ) { }

  async register(userData: Partial<User>): Promise<User | null> {
    if (!userData.phone || !userData.password || !userData.name) {
      throw new BadRequestException('All fields (phone, password, name) are required')
    }

    const existingUser = await this.findByPhone(userData.phone)

    if (existingUser) {
      throw new BadRequestException('Phone number already exists')
    }

    const hashedPassword = await hashData(userData.password)

    return await FunService.create(this.userModel, {
      ...userData,
      password: hashedPassword
    })
  }

  async login(phone: string, password: string): Promise<{ user: User; tokenAccess: string; tokenRefresh: string }> {
    if (!phone || !password) {
      throw new BadRequestException('Phone and password are required')
    }

    const user = await this.findByPhone(phone)

    if (!user) {
      throw new NotFoundException('Account does not exist')
    }

    const isMatch = await compareData(password, user.password)

    if (!isMatch) {
      throw new BadRequestException('Incorrect password')
    }

    const { tokenAccess, tokenRefresh } = this.authService.generateAuth(user._id.toString(), user.phone)

    return { user, tokenAccess, tokenRefresh }
  }

  async createUser(userData: Partial<User>): Promise<User | null> {
    if (userData.phone) {
      const existingUser = await this.findByPhone(userData.phone)

      if (existingUser) {
        throw new BadRequestException('Phone number already exists')
      }
    }

    if (userData.password) {
      userData.password = await hashData(userData.password)
    }

    return await FunService.create(this.userModel, userData)
  }

  async findAll(query: any) {
    try {
      const { data, pagination } = await FunService.getDataByOptionsWithPagination(this.userModel, query)

      return { data, pagination }
    } catch (error) {
      console.error('Error finding all Users:', error)

      return { data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } }
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await FunService.findDataByID(this.userModel, getIdObject(id))
    } catch (error) {
      console.error('Error finding User by ID:', error)

      return null
    }
  }

  async findByPhone(phone: string): Promise<UserDocument | null> {
    try {
      return await this.userModel.findOne({ phone }).exec()
    } catch (error) {
      console.error('Error finding User by phone:', error)

      return null
    }
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    try {
      if (updateData.password) {
        updateData.password = await hashData(updateData.password)
      }

      return await FunService.updateData(this.userModel, getIdObject(id), updateData)
    } catch (error) {
      console.error('Error updating User:', error)

      return null
    }
  }

  async remove(id: string): Promise<User | null> {
    try {
      return await FunService.deleteDataByID(this.userModel, getIdObject(id))
    } catch (error) {
      console.error('Error deleting User:', error)

      return null
    }
  }

  async getInfoMe(tokenAccess: string): Promise<User | null> {
    try {
      const token = this.authService.verifyAth(tokenAccess)

      if (token) {
        const idUser = await this.userModel.findById(token.id)
        const user = await this.userModel.findById(idUser)
        const userClone = user.toObject()

        delete userClone.password

        return userClone
      }

      return null
    } catch (error) {
      console.error('Error getting user info:', error)

      return null
    }
  }
}
