import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Types } from 'mongoose'
import { JWT_AUTH } from 'src/common/app'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  getSecretKey(): string {
    return JWT_AUTH.secret || process.env.SECRET_KEY_JWT
  }

  generateAuth(id: string | Types.ObjectId, sdt: string): { tokenAccess: string; tokenRefresh: string } {
    return {
      tokenAccess: this.generateAuthAccess(id.toString(), sdt),
      tokenRefresh: this.generateAuthRefresh(id.toString(), sdt),
    }
  }

  generateAuthAccess(id: string, sdt: string): string {
    return this.jwtService.sign({ id, sdt }, {
      secret: this.getSecretKey(),
      expiresIn: JWT_AUTH.expiredAccess
    })
  }

  generateAuthRefresh(id: string, sdt: string): string {
    return this.jwtService.sign({ id, sdt }, {
      secret: this.getSecretKey(),
      expiresIn: JWT_AUTH.expiredRefresh
    })
  }

  verifyAth(
    token: string,
    isRefreshToken: boolean = false,
  ):
    | false
    | {
      id: string;
      sdt: string;
      iat: number;
      exp: number;
    } {
    try {
      const data = this.jwtService.verify(token.replace('Bearer ', ''), {
        secret: this.getSecretKey(),
      })

      return data
    } catch (error) {
      return false
    }
  }

  async refreshTokenAccess(tokenRefresh: string): Promise<string> {
    const dataUser: any = this.jwtService.decode(tokenRefresh)

    if (!dataUser) return null

    return this.generateAuthAccess(dataUser.id, dataUser.sdt)
  }

  verifyIdUser(idUser: string, tokenAccess: string): boolean {
    tokenAccess = tokenAccess.replace('Bearer ', '')
    const dataUser: any = this.jwtService.decode(tokenAccess)

    return dataUser?.id === idUser
  }
}
