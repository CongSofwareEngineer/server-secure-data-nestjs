import { Body, Controller, Get, Param, Post, Res, Query, Delete, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger'
import { FinanceService } from './finance.service'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiParam_Id, ApiBody_CreateFinance, ApiBody_UpdateFinance, ApiQuery_Page, ApiQuery_Limit } from './docs/finance.docs'

@ApiBearerAuth()
@ApiTags('Finance')
@Controller('finance')
@UseGuards(JwtAuthGuard)
export class FinanceController {
  constructor(private financeService: FinanceService) { }

  @ApiOperation({ summary: 'Get USD remaining (deposit - withdraw)' })
  @Get('usd-remaining')
  async getUsdRemaining(@Res() res) {
    const data = await this.financeService.getUsdRemaining()

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Get list of finance records' })
  @ApiQuery_Page
  @ApiQuery_Limit
  @Get('all')
  async findAll(@Res() res, @Query() query) {
    const data = await this.financeService.findAll(query)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Get finance record details' })
  @ApiParam_Id
  @Get('detail/:id')
  async findOne(@Res() res, @Param('id') id: string) {
    const data = await this.financeService.findOne(id)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Create a new finance record' })
  @ApiBody_CreateFinance
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.financeService.create(body)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Update finance record information' })
  @ApiParam_Id
  @ApiBody_UpdateFinance
  @Put('update/:id')
  async update(@Res() res, @Param('id') id: string, @Body() body) {
    const data = await this.financeService.update(id, body)

    return formatRes(res, data)
  }

  @ApiOperation({ summary: 'Delete a finance record' })
  @ApiParam_Id
  @Delete('delete/:id')
  async remove(@Res() res, @Param('id') id: string) {
    const data = await this.financeService.remove(id)

    return formatRes(res, data)
  }
}
