import * as  CryptoJS from 'crypto-js'

const getIV = () => CryptoJS.enc.Hex.parse(process.env.KEY_CRYPTO_IV_ENCODE!)


const encUtf8 = (pinCode?: string) => {
  if (!pinCode) {
    pinCode = process.env.KEY_CRYPTO_IV_ENCODE
  }

  return CryptoJS.PBKDF2(pinCode, CryptoJS.enc.Utf8.parse(process.env.KEY_CRYPTO_IV_ENCODE!), {
    keySize: 256 / 32, // AES-256
    iterations: 1000,
    hasher: CryptoJS.algo.SHA256
  })
}


export const encryptData = (value: any, pinCode?: string) => {
  try {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    return CryptoJS.AES.encrypt(value, encUtf8(pinCode), {
      iv: getIV(),
    }).toString()
  } catch (error) {
    return ''
  }
}

export const decryptData = (value: string, pinCode?: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(value, encUtf8(pinCode), {
      iv: getIV(),
    })
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)

    return decrypted
  } catch (error) {
    console.log({ error })

    return ''
  }
}




