import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './presentation/auth.controller';
import { USER_REPO_TOKEN } from './application/ports/user.repositary.port';
import { DrizzleUserRepository } from './infrastructure/database/drizzle.user-repository';

@Module({
  providers: [
    AuthService,
    {
      provide: USER_REPO_TOKEN,
      useClass: DrizzleUserRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
