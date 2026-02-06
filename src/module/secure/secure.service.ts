import { Injectable } from '@nestjs/common'
import { decryptData, encryptData } from 'src/utils/crypto'
import { lowercase } from 'src/utils/function'


@Injectable()
export class SecureService {

  decodeData(body: { password: string; data: string }) {
    let password = body.password

    const passwordDefault = process.env.DEFAULT_CRYPTO_PASSWORD || ''

    if (!password) {
      password = passwordDefault
    } else {
      if (password !== passwordDefault) {
        if (password.includes(passwordDefault)) {
          password = lowercase(password)
          password = password.replace(lowercase(passwordDefault), passwordDefault)
        } else {
          password = lowercase(password)
        }
      }
    }

    const decrypted = decryptData(body.data, password)

    return decrypted
  }

  encodeData(body: { password: string; data: string }) {
    let password = body.password
    const passwordDefault = process.env.DEFAULT_CRYPTO_PASSWORD || ''

    if (!password) {
      password = passwordDefault
    } else {
      if (password !== passwordDefault) {
        if (password.includes(passwordDefault)) {
          password = lowercase(password)
          password = password.replace(lowercase(passwordDefault), passwordDefault)
        } else {
          password = lowercase(password)
        }
      }

    }

    const encrypted = encryptData(body.data, password)

    return encrypted
  }

}
