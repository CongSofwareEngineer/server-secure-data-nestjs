import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger'

export const ApiQuery_Page = ApiQuery({
  name: 'page',
  required: false,
  description: 'Page number (default: 1)',
  example: 1,
})

export const ApiQuery_Limit = ApiQuery({
  name: 'limit',
  required: false,
  description: 'Number of items per page (default: 20)',
  example: 20,
})

export const ApiParam_Id = ApiParam({
  name: 'id',
  required: true,
  description: 'Account ID',
})

export const ApiBody_CreateAccount = ApiBody({
  description: 'Account data',
  schema: {
    type: 'object',
    required: [],
    properties: {
      privateKey: { type: 'string', description: 'Private Key' },
      seedPhrase: { type: 'string', description: 'Seed Phrase' },
      address: { type: 'string', description: 'Wallet Address' },
      name: { type: 'string', description: 'Account Name' },
    },
  },
})

export const ApiBody_UpdateAccount = ApiBody({
  description: 'Partial account data to update',
  schema: {
    type: 'object',
    properties: {
      privateKey: { type: 'string', description: 'Private Key' },
      seedPhrase: { type: 'string', description: 'Seed Phrase' },
      address: { type: 'string', description: 'Wallet Address' },
      name: { type: 'string', description: 'Account Name' },
    },
  },
})
