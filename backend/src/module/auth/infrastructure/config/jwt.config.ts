import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'FALL_BACK_SECRET',
  expiresIn: (process.env.JWT_EXPIRE || '7d') as string | number,
}));
