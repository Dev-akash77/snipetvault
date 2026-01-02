import { Module } from '@nestjs/common';
import { AuthController } from './presentation/http/controller/auth.controller';
import { USER_REPO_TOKEN } from './application/ports/user.repositary.port';
import { DrizzleUserRepository } from './infrastructure/adaptars/db/drizzle.user-repository';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { HASHING_SERVICE_TOKEN } from './application/ports/hashing.service.port';
import { BcryptService } from './infrastructure/adaptars/services/bcrypt-hashing.service';

@Module({
  providers: [
    RegisterUseCase,
    {
      provide: USER_REPO_TOKEN,
      useClass: DrizzleUserRepository,
    },
    {
      provide: HASHING_SERVICE_TOKEN,
      useClass: BcryptService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
