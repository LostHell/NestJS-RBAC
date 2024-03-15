import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService(app);
  const host = configService.get<string>('HOST', 'localhost');
  const port = configService.get<number>('PORT', 4200);
  await app.listen(port, host);
}
bootstrap();
