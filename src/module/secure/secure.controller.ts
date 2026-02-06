import { Body, Controller, Post, Res } from '@nestjs/common'
import { SecureService } from './secure.service'
import { ApiTags } from '@nestjs/swagger'
import { ApiBody_CryptoPayload } from './docs/secure.docs'

@ApiTags('Secure')
@Controller('info-wallet')
export class SecureController {
  constructor(private readonly SecureService: SecureService) { }

  @ApiBody_CryptoPayload
  @Post('encrypt')
  async encrypt(@Res() res, @Body() body: { password: string; data: string }) {
    try {
      const encrypted = this.SecureService.encodeData(body)

      return res.json({ status: 'success', data: encrypted })
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Encryption failed' })
    }
  }

  @ApiBody_CryptoPayload
  @Post('decrypt')
  async decrypt(@Res() res, @Body() body: { password: string; data: string }) {
    try {
      const decrypted = this.SecureService.decodeData(body)

      return res.json({ status: 'success', data: decrypted })
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Decryption failed' })
    }
  }
}
