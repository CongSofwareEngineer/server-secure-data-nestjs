import * as AES from 'crypto-js/aes'
import * as EncUtf8 from 'crypto-js/enc-utf8'
import * as EncHex from 'crypto-js/enc-hex'

const getIV = () => EncHex.parse(process.env.KEY_CRYPTO_IV_ENCODE!)


const encUtf8 = (pinCode?: string) => {
  return EncUtf8.parse(pinCode || process.env.KEY_CRYPTO_IV_ENCODE)
}


export const encryptData = (value: any, pinCode?: string) => {
  try {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    return AES.encrypt(value, encUtf8(pinCode), {
      iv: getIV(),
    }).toString()
  } catch (error) {
    return ''
  }
}

export const decryptData = (value: string, pinCode?: string) => {
  try {
    const bytes = AES.decrypt(value, encUtf8(pinCode), {
      iv: getIV(),
    })
    const decrypted = bytes.toString(EncUtf8)

    return decrypted
  } catch (error) {

    return ''
  }
}




