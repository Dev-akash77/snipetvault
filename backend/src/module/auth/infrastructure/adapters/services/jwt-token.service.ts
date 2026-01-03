import { Injectable } from '@nestjs/common';
import {
  TokenPayload,
  TokenServicePort,
} from '../../../application/ports/token.service.port';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements TokenServicePort {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<TokenPayload | null> {
    try {
      const payload = this.jwtService.verifyAsync<TokenPayload>(token);
      return payload;
    } catch (error) {
      return null;
    }
  }
}
