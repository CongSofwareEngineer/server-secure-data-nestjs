import { HttpStatus } from '@nestjs/common'
import { LIMIT_DATA } from 'src/common/app'
import { Types } from 'mongoose'
import { MATH_DB } from 'src/common/mongoDB'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment')

export function queryMatchName(name?: string) {
  try {
    if (!name) {
      return {}
    }

    return { [MATH_DB.$regex]: new RegExp(name, 'i') }
  } catch (error) {
    return {}
  }
}

export function delayTime(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function getIdObject(id: any): any {
  try {
    return new Types.ObjectId(id)
  } catch (error) {
    return process.env.KEY_CRYPTO_IV_ENCODE
  }
}

export function convertBoolean(value: any): boolean {
  try {
    if (lowercase(value) === 'true' || value === true) {
      return true
    }

    return false
  } catch (error) {
    return false
  }
}

export function isObject(value: any): boolean {
  try {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
  } catch (error) {
    console.error('Error checking if value is an object:', error)

    return false
  }
}

export function getDateToQuery(value: string): { $gte: number; $lte: number } {
  const day = new Date(Number(value))
  const start = moment(day).startOf('day').valueOf()
  const end = moment(day).endOf('day').valueOf()

  return { $gte: start, $lte: end }
}

export function getRangeDateToQuery(startDate: string, endDate: string): { $gte: string; $lte: string } {
  const start = moment(Number(startDate)).startOf('day').valueOf().toString()
  const end = moment(Number(endDate)).endOf('day').valueOf().toString()

  return { $gte: start, $lte: end }
}

export function checkValidToDate(value: string): boolean {
  try {
    const start = moment(Number(value))

    return start.isSame(moment(), 'day')
  } catch (error) {
    return false
  }
}

export function cloneData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

export function lowercase(text: any): string {
  try {
    return text?.toString().toLowerCase() ?? ''
  } catch (error) {
    console.error('Error converting text to lowercase:', error)

    return text
  }
}

export function getPageLimitSkip(query: { [key: string]: any }) {
  const rawPage = Number(query?.page)
  const rawLimit = Number(query?.limit)

  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1
  const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.floor(rawLimit) : LIMIT_DATA
  const skip = (page - 1) * limit

  return {
    page,
    limit,
    skip,
  }
}

export const numberWithCommas = (x: any) => {
  if (!x) {
    return 0
  }
  const parts = x.toString().split('.')

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return parts.join('.')
}

export function formatRes(response: any, data: any, isError?: boolean) {
  try {
    if (isError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
      })
    }

    return response.status(HttpStatus.OK).json({
      data,
      status: HttpStatus.OK,
    })
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      data: null,
      status: HttpStatus.BAD_REQUEST,
    })
  }
}




export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
