import { Module } from '@nestjs/common';
import { AuthController } from './presentation/http/controller/auth.controller';
import { USER_REPO_TOKEN } from './application/ports/user.repositary.port';
import { DrizzleUserRepository } from './infrastructure/adapters/db/drizzle.user-repository';
import { RegisterUseCase } from './application/usecases/register.use-case';
import { HASHING_SERVICE_TOKEN } from './application/ports/hashing.service.port';
import { BcryptService } from './infrastructure/adapters/services/bcrypt-hashing.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { jwtConfig } from './infrastructure/config/jwt.config';
import { TOKEN_SERVICE_TOKEN } from './application/ports/token.service.port';
import { JwtTokenService } from './infrastructure/adapters/services/jwt-token.service';
import { LoginUsecase } from './application/usecases/login.use-caes';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [jwtConfig.KEY],
      useFactory: (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,
        signOptions: { expiresIn: config.expiresIn as any },
      }),
    }),
  ],
  providers: [
    RegisterUseCase,
    LoginUsecase,
    JwtStrategy,
    {
      provide: USER_REPO_TOKEN,
      useClass: DrizzleUserRepository,
    },
    {
      provide: HASHING_SERVICE_TOKEN,
      useClass: BcryptService,
    },
    {
      provide: TOKEN_SERVICE_TOKEN,
      useClass: JwtTokenService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
