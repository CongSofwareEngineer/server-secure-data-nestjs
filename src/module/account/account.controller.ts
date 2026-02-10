import { Body, Controller, Get, Param, Post, Res, Query, Delete, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger'
import { AccountService } from './account.service'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiParam_Id, ApiBody_CreateAccount, ApiBody_UpdateAccount, ApiQuery_Page, ApiQuery_Limit } from './docs/account.docs'

@ApiBearerAuth()
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) { }

  @ApiOperation({ summary: 'Get list of accounts' })
  @ApiQuery_Page
  @ApiQuery_Limit
  @Get('all')
  async findAll(@Res() res, @Query() query) {
    const data = await this.accountService.findAll(query)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Get account details' })
  @ApiParam_Id
  @Get('detail/:id')
  async findOne(@Res() res, @Param('id') id: string) {
    const data = await this.accountService.findOne(id)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new account' })
  @ApiBody_CreateAccount
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.accountService.create(body)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update account information' })
  @ApiParam_Id
  @ApiBody_UpdateAccount
  @Put('update/:id')
  async update(@Res() res, @Param('id') id: string, @Body() body) {
    const data = await this.accountService.update(id, body)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete an account' })
  @ApiParam_Id
  @Delete('delete/:id')
  async remove(@Res() res, @Param('id') id: string) {
    const data = await this.accountService.remove(id)

    return formatRes(res, data)
  }
}
