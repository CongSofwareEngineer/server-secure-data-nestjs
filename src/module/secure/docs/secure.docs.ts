import { ApiBody } from '@nestjs/swagger'

export const ApiBody_CryptoPayload = ApiBody({
  description: 'Payload containing password and data for encryption/decryption',
  schema: {
    type: 'object',
    required: ['password', 'data'],
    properties: {
      password: { type: 'string', description: 'Encryption/decryption password' },
      data: { type: 'string', description: 'Plain text for encrypt or cipher text for decrypt' },
    },
  },
})
