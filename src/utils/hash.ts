import * as bcrypt from 'bcrypt'


export const hashData = async (data: any) => {
  return bcrypt.hash(JSON.stringify(data), 10)
}

export const compareData = async (first: string, storedHash: string) => {
  return bcrypt.compare(JSON.stringify(first), storedHash)
}