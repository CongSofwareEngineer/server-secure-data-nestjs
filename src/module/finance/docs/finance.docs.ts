import { ApiBody, ApiParam } from '@nestjs/swagger'
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
      date: { type: 'string', format: 'date-time', description: 'Date of transaction (optional, defaults to now)' },
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
      date: { type: 'string', format: 'date-time', description: 'Date of transaction' },
      usdAmount: { type: 'number', description: 'Amount in USD' },
      vndAmount: { type: 'number', description: 'Amount in VND' },
      status: { type: 'string', enum: Object.values(FinanceStatus), description: 'Status (rút/nạp)' },
    },
  },
})
