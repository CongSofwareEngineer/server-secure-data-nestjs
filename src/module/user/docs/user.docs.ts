import { ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger'

/**
 * Common pagination query parameters
 */
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

/**
 * Path parameters
 */
export const ApiParam_Id = ApiParam({
  name: 'id',
  required: true,
  description: 'User ID',
})

/**
 * Body schemas
 */
export const ApiBody_Register = ApiBody({
  description: 'Registration data',
  schema: {
    type: 'object',
    required: ['phone', 'password', 'name'],
    properties: {
      phone: { type: 'string', description: 'Phone number' },
      password: { type: 'string', description: 'Password' },
      name: { type: 'string', description: 'User name' },
    },
  },
})

export const ApiBody_Login = ApiBody({
  description: 'Login credentials',
  schema: {
    type: 'object',
    required: ['phone', 'password'],
    properties: {
      phone: { type: 'string', description: 'Phone number' },
      password: { type: 'string', description: 'Password' },
    },
  },
})

export const ApiBody_CreateUser = ApiBody({
  description: 'User data for admin creation',
  schema: {
    type: 'object',
    required: ['phone', 'password', 'name'],
    properties: {
      phone: { type: 'string', description: 'Phone number' },
      password: { type: 'string', description: 'Password' },
      name: { type: 'string', description: 'User name' },
    },
  },
})

export const ApiBody_UpdateUser = ApiBody({
  description: 'Partial user data to update',
  schema: {
    type: 'object',
    properties: {
      phone: { type: 'string', description: 'Phone number' },
      password: { type: 'string', description: 'Password' },
      name: { type: 'string', description: 'User name' },
    },
  },
})
