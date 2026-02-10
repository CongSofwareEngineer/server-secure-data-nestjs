import { Body, Controller, Get, Param, Post, Res, Query, Delete, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { formatRes } from 'src/utils/function'
import { AccountCloudService } from './accountCloud.service'
import {
  ApiBody_CreateAccountCloud,
  ApiBody_UpdateAccountCloud,
  ApiParam_Id,
  ApiQuery_Limit,
  ApiQuery_Page,
} from './docs/accountCloud.docs'

@ApiBearerAuth()
@ApiTags('AccountCloud')
@Controller('account-cloud')
@UseGuards(JwtAuthGuard)
export class AccountCloudController {
  constructor(private accountCloudService: AccountCloudService) { }

  @ApiOperation({ summary: 'Get list of AccountCloud records' })
  @ApiQuery_Page
  @ApiQuery_Limit
  @Get('all')
  async findAll(@Res() res, @Query() query) {
    const data = await this.accountCloudService.findAll(query)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Get AccountCloud details' })
  @ApiParam_Id
  @Get('detail/:id')
  async findOne(@Res() res, @Param('id') id: string) {
    const data = await this.accountCloudService.findOne(id)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Create a new AccountCloud record' })
  @ApiBody_CreateAccountCloud
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.accountCloudService.create(body)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Update AccountCloud information' })
  @ApiParam_Id
  @ApiBody_UpdateAccountCloud
  @Put('update/:id')
  async update(@Res() res, @Param('id') id: string, @Body() body) {
    const data = await this.accountCloudService.update(id, body)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Delete an AccountCloud record' })
  @ApiParam_Id
  @Delete('delete/:id')
  async remove(@Res() res, @Param('id') id: string) {
    const data = await this.accountCloudService.remove(id)

    return formatRes(res, data)
  }


}
