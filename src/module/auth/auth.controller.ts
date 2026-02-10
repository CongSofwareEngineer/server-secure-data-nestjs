import { Controller, Get, Post, Request, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { formatRes } from 'src/utils/function'
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Refresh access token using refresh token cookie' })
  @Post('/refresh')
  async refreshToken(@Res() res, @Request() req) {
    // const tokenRefresh = req.cookies.tokenRefresh || ''
    const tokenRefresh = req.headers?.authorization || ''


    const dataVerify = this.authService.verifyAth(tokenRefresh, true)

    if (dataVerify && typeof dataVerify !== 'boolean') {
      const tokenAccess = this.authService.generateAuthAccess(dataVerify.id, dataVerify.sdt)

      // res.cookie('tokenAccess', tokenAccess, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'none',
      //   maxAge: 15 * 60 * 1000, // 15 min
      //   path: '/'
      // })

      return formatRes(res, { status: true, tokenAccess })
    }

    return formatRes(res, { status: false })
  }

  @ApiOperation({ summary: 'Check auth service availability' })
  @Get('/ping')
  async pingServer(@Res() res) {
    return formatRes(res, {
      isWork: true,
    })
  }
}
