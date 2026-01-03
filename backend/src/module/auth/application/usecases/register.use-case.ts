import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { USER_REPO_TOKEN } from '../ports/user.repositary.port';
import type { UserRepositoryPort } from '../ports/user.repositary.port';
import {
  HASHING_SERVICE_TOKEN,
  type HashingServicePort,
} from '../ports/hashing.service.port';
import { User } from '../../domain/user.entity';
import { RegisterUserInput } from '../contracts/registration.contract';
import { AppException } from '../../../../common/exceptions/app.exception';
import { ErrorCode } from '../../../../common/constants/error-code';
 
@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepo: UserRepositoryPort,
    @Inject(HASHING_SERVICE_TOKEN) private readonly hasher: HashingServicePort,
  ) {}

  // ! EXECUTE FN
  async execute(input: RegisterUserInput): Promise<User> {
    const email = input.email.trim().toLowerCase();
    // !CHECK THE EMAIL IS EXIST OR NOT
    const exist = await this.userRepo.findEmail(email);

    if (exist) {
      throw new AppException(
        'Conflict',
        HttpStatus.CONFLICT,
        ErrorCode.CONFLICT,
        ['User allready exist'],
      );
    }
    // ! HASHED THE PASSWORD
    const hashedpass = await this.hasher.hashing(input?.password);
    return this.userRepo.createUser({name:input.name,email:email,password:hashedpass,role:"user"})
  }
  
}
