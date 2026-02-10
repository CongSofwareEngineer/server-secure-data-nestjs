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
  description: 'AccountCloud ID',
})

export const ApiBody_CreateAccountCloud = ApiBody({
  description: 'AccountCloud data',
  schema: {
    type: 'object',
    properties: {
      nameApp: { type: 'string', description: 'Name of the app' },
      userName: { type: 'string', description: 'User name' },
      password: { type: 'string', description: 'Password' },
      pinCode: { type: 'string', description: 'Pin code' },
      stk: { type: 'string', description: 'STK' },
      pinCodeBackup: { type: 'string', description: 'Backup pin code' },
      type: { type: 'string', description: 'Type of account' },
    },
  },
})

export const ApiBody_UpdateAccountCloud = ApiBody({
  description: 'Partial AccountCloud data to update',
  schema: {
    type: 'object',
    properties: {
      nameApp: { type: 'string', description: 'Name of the app' },
      userName: { type: 'string', description: 'User name' },
      password: { type: 'string', description: 'Password' },
      pinCode: { type: 'string', description: 'Pin code' },
      stk: { type: 'string', description: 'STK' },
      pinCodeBackup: { type: 'string', description: 'Backup pin code' },
      type: { type: 'string', description: 'Type of account' },
    },
  },
})
