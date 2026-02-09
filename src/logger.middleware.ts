import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req?.body?.dev) {
        return next()
      }

      console.log(`[${req.method}] ${req.originalUrl}`)
      next()
    } catch (error) {
      console.error('Middleware Error:', error)
      this.sendUnauthorizedResponse(res, 'System Error')
    }
  }

  private sendUnauthorizedResponse(res: Response, message: string): void {
    res.status(HttpStatus.UNAUTHORIZED).send({
      error: message,
      status: HttpStatus.UNAUTHORIZED,
    })
  }
}
