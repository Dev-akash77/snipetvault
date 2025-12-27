import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDatabase } from '.';
import { injection_token } from '../common/constants/constant';

@Global()
@Module({
  providers: [
    {
      provide: injection_token.DB_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.getOrThrow<string>('DATABASE_URL');
        return createDatabase(dbUrl);
      },
    },
  ],
  exports: [injection_token.DB_CONNECTION],
})
export class DatabaseModule {}
