import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger'
import { FinanceStatus } from '../schemas/finance.schema'

export const ApiParam_Id = ApiParam({
  name: 'id',
  required: true,
  description: 'Finance record ID',
})

export const ApiBody_CreateFinance = ApiBody({
  description: 'Finance data',
  schema: {
    type: 'object',
    required: ['usdAmount', 'vndAmount', 'status'],
    properties: {
      usdAmount: { type: 'number', description: 'Amount in USD' },
      vndAmount: { type: 'number', description: 'Amount in VND' },
      status: { type: 'string', enum: Object.values(FinanceStatus), description: 'Status (rút/nạp)' },
    },
  },
})

export const ApiBody_UpdateFinance = ApiBody({
  description: 'Partial finance data to update',
  schema: {
    type: 'object',
    properties: {
      usdAmount: { type: 'number', description: 'Amount in USD' },
      vndAmount: { type: 'number', description: 'Amount in VND' },
      status: { type: 'string', enum: Object.values(FinanceStatus), description: 'Status (rút/nạp)' },
    },
  },
})

export const ApiQuery_Page = ApiQuery({
  name: 'page',
  required: false,
  description: 'Page number (default: 1)',
  example: 1,
})

export const ApiQuery_Limit = ApiQuery({
  name: 'limit',
  required: false,
  description: 'Number of items per page (default: 10)',
  example: 10,
})
