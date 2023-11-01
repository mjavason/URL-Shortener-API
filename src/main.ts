import { NestFactory } from '@nestjs/core';
import { ValidationPipe, HttpStatus, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev')); // 'combined', 'common', 'dev', 'tiny'

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            [`${error.property}`]: {
              error: `${error.property} has wrong value ${error.value}.`,
              message: Object.values(error.constraints).join(''),
            },
          };
        });

        const errorResponse = {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: messages,
        };
        return new BadRequestException(errorResponse);
      },
    }),
  );

  const config = new DocumentBuilder()
  .setTitle('URL Shortener API')
  .setDescription(
    'The URL Shortener API simplifies the process of transforming long URLs into concise, shareable links. Users can submit lengthy URLs, and the API generates short, user-friendly links for easy sharing and tracking. Customize your short links, implement expiration, and gain insights into link usage.'
  )
  .setVersion('1.0')
  .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
