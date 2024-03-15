import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService(app);
  const host = configService.get<string>('HOST', 'localhost');
  const port = configService.get<number>('PORT', 4200);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');

  await app.listen(port, host);
}
bootstrap();
