import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPO_TOKEN,
  type UserRepositoryPort,
} from '../ports/user.repositary.port';
import {
  HASHING_SERVICE_TOKEN,
  type HashingServicePort,
} from '../ports/hashing.service.port';
import {
  TOKEN_SERVICE_TOKEN,
  type TokenServicePort,
} from '../ports/token.service.port';
import { LoginUserInput } from '../contracts/login.contract copy';
import { AppException } from '../../../../common/exceptions/app.exception';
import { ErrorCode } from '../../../../common/constants/error-code';

@Injectable()
export class LoginUsecase {
  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepo: UserRepositoryPort,
    @Inject(HASHING_SERVICE_TOKEN) private readonly hasher: HashingServicePort,
    @Inject(TOKEN_SERVICE_TOKEN) private readonly jwtToken: TokenServicePort,
  ) {}

  async execute(data: LoginUserInput) {
    const email = data.email.trim().toLocaleLowerCase();
    const exist = await this.userRepo.findEmail(email);
    if (!exist) {
      throw new AppException(
        'Authentication Failed',
        HttpStatus.UNAUTHORIZED,
        ErrorCode.INVALID_CREDENTIALS,
        ['Invalid email or password'],
      );
    }

    const isMatch = await this.hasher.compare(data.password, exist.password);
    if (!isMatch) {
      throw new AppException(
        'Authentication Failed',
        HttpStatus.UNAUTHORIZED,
        ErrorCode.INVALID_CREDENTIALS,
        ['Invalid email or password'],
      );
    }

    const payload = {
      userId: String(exist.id),
      role: exist.role,
      email:exist.email
    };

    const token = await this.jwtToken.generateToken(payload);

    return {
      accessToken: token,
      user: {
        id: exist.id,
        email: exist.email,
        role: exist.role,
      },
    };
  }
}
