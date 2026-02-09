import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { json } from 'express'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'


const darkThemeCss = `
  .swagger-ui {
    background-color: #d9d9d9 !important;
  }
    .scheme-container{
      background-color: #d9d9d9 !important;
    }
`



async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  let listDomain: string | string[] = '*'

  if (process.env.ENABLE_LIMIT_DOMAIN) {
    listDomain = process.env.DOMAIN_VALID.split(',')
  }
  app.enableCors({
    origin: listDomain,
    credentials: true,
  })
  // Security headers
  app.use(helmet())

  if (process.env.ENABLE_REDIS) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options: {
        username: 'default',
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
      },
    })
  }



  await app.startAllMicroservices()
  logger.log('Microservice is listening')




  app.use(json({ limit: '20mb' }))


  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Edu Manager API')
    .setDescription('The Edu Manager API description for student registration and management')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document, {
    customCss: darkThemeCss,
  })
  await app.listen(process.env.PORT || 3002)
}
bootstrap()
