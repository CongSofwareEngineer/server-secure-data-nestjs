import { Body, Controller, Get, Param, Post, Res, Query, Delete, Put, UseGuards, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger'

import { UserService } from './user.service'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import {
  ApiQuery_Page,
  ApiQuery_Limit,
  ApiParam_Id,
  ApiBody_Register,
  ApiBody_Login,
  ApiBody_CreateUser,
  ApiBody_UpdateUser
} from './docs/user.docs'

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @ApiOperation({ summary: 'Register a new account' })
  @ApiBody_Register
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Res() res, @Body() body) {
    const data = await this.userService.register(body)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Login to account' })
  @ApiBody_Login
  @Post('login')
  async login(@Res() res, @Body() body) {
    const { user, tokenAccess, tokenRefresh } = await this.userService.login(body.phone, body.password)

    // res.cookie('tokenAccess', tokenAccess, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   maxAge: 15 * 60 * 1000, // 15 min
    //   path: '/',
    // })

    // res.cookie('tokenRefresh', tokenRefresh, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   maxAge: 15 * 24 * 60 * 60 * 1000, // 7 days
    //   path: '/',
    // })

    return formatRes(res, {
      user,
      tokenAccess,
      tokenRefresh
    })
  }

  @ApiOperation({ summary: 'Get list of users' })
  @ApiQuery_Page
  @ApiQuery_Limit
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll(@Res() res, @Query() query) {
    const data = await this.userService.findAll(query)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Get user details' })
  @ApiParam_Id
  @UseGuards(JwtAuthGuard)
  @Get('detail/:id')
  async findOne(@Res() res, @Param('id') id: string) {
    const data = await this.userService.findOne(id)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new user (admin only)' })
  @ApiBody_CreateUser
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.userService.createUser(body)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user information' })
  @ApiParam_Id
  @ApiBody_UpdateUser
  @Put('update/:id')
  async update(@Res() res, @Param('id') id: string, @Body() body) {
    const data = await this.userService.update(id, body)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam_Id
  @Delete('delete/:id')
  async remove(@Res() res, @Param('id') id: string) {
    const data = await this.userService.remove(id)

    return formatRes(res, data)
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user information' })
  @Post('info-me')
  async getInfoMe(@Res() res, @Req() req) {
    // const tokenAccess = req.cookies.tokenAccess
    const tokenAccess = req.headers?.authorization || ''
    const data = await this.userService.getInfoMe(tokenAccess)

    return formatRes(res, data)
  }
}
