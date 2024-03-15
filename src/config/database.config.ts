import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseSettings = (configService: ConfigService): TypeOrmModuleOptions => {
  const environment = configService.get<string>('NODE_ENV', 'development');

  const commonOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get<string>('DATABASE_HOST', 'localhost'),
    port: configService.get<number>('DATABASE_PORT', 3306),
    username: configService.get<string>('DATABASE_USER', 'root'),
    password: configService.get<string>('DATABASE_PASSWORD', '1234'),
    database: configService.get<string>('DATABASE_NAME', 'monitoring'),
    autoLoadEntities: true,
  };

  if (environment === 'production') {
    return {
      ...commonOptions,
      synchronize: false, // Disable synchronize in production
    };
  }

  return {
    ...commonOptions,
    synchronize: true, // Enable synchronize in development
  };
};
