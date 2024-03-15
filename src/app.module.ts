import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseSettings } from './config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule
      inject: [ConfigService], // Inject the ConfigService
      useFactory: (configService: ConfigService) => databaseSettings(configService), // Use the ConfigService to pass configuration values
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
