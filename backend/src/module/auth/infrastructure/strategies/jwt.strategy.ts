import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  USER_REPO_TOKEN,
  type UserRepositoryPort,
} from '../../application/ports/user.repositary.port';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppException } from '../../../../common/exceptions/app.exception';
import { ErrorCode } from '../../../../common/constants/error-code';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../application/contracts/jwt-payload.contract';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepo: UserRepositoryPort,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepo.findById(payload.userId);
    
    if (!user) {
      throw new AppException(
        'Authentication Failed',
        HttpStatus.UNAUTHORIZED,
        ErrorCode.INVALID_CREDENTIALS,
        ['Invalid or expired token'],
      );
    }
    return user;
  }
}
