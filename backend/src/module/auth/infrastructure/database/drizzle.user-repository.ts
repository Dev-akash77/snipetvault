import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../application/ports/user.repositary.port';
import { injection_token } from '../../../../common/constants/constant';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../../database/schema';
import { User } from '../../domain/user.model';
import { eq } from 'drizzle-orm';
import { AppException } from '../../../../common/exceptions/app.exception';
import { ErrorCode } from '../../../../common/constants/error-code';

@Injectable()
export class DrizzleUserRepository implements UserRepositoryPort {
  constructor(
    @Inject(injection_token.DB_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));

      
    if (result.length === 0) {
      throw new AppException(
        'Not Found',
        HttpStatus.NOT_FOUND,
        ErrorCode.NOT_FOUND,
        ['User Not Found'],
      );
    }

    return result[0];
  }

  async createUser(user: any): Promise<User> {
    const result = await this.db.insert(schema.users).values(user).returning();
    return result[0];
  }
}
