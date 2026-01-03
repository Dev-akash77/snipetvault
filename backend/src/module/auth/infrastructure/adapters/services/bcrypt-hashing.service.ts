import * as bcrypt from 'bcrypt';
import { HashingServicePort } from '../../../application/ports/hashing.service.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService implements HashingServicePort {
  private readonly SALT_ROUND = 10;

// ! HASHING THE PASSWORD 
  async hashing(data: string): Promise<string> {
    return await bcrypt.hash(data, this.SALT_ROUND);
  }

//   ! COMPARE THE HASHED PASS
  async compare(data: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}
