import { ApiHeaderOptions } from '@nestjs/swagger'

export const AuthDoc = {
  authorization: {
    name: 'authorization',
    required: true,
    description: 'Bearer refresh token',
  } as ApiHeaderOptions,
}
