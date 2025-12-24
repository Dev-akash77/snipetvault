import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDatabase } from '.';

@Module({
  providers: [
    {
      provide: 'DB',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.getOrThrow<string>('DATABASE_URL');
        return createDatabase(dbUrl);
      },
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
