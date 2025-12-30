import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from './ports/user.repositary.port';
import { USER_REPO_TOKEN } from './ports/user.repositary.port';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPO_TOKEN)
    private userRepo: UserRepositoryPort,
  ) {}

  async validateUser(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const result = await this.userRepo.findEmail(normalizedEmail);
    return result
  }

  async register(data:any){
    const {email,name,password} = data;
    
    const result = await this.userRepo.createUser({email,name,password,role:"user"});
    
    return result
  } 
}
