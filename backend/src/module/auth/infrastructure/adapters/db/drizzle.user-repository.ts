import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../../application/ports/user.repositary.port';
import { injection_token } from '../../../../../common/constants/constant';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../../../database/schema';
import { User } from '../../../domain/user.entity';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleUserRepository implements UserRepositoryPort {
  constructor(
    @Inject(injection_token.DB_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // ! FIND BY EMAIL
  async findEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));

    return result.length > 0 ? result[0] : null;
  }

  // ! CREATE USER
  async createUser(user: User): Promise<User> {
    const result = await this.db.insert(schema.users).values(user).returning();
    return result[0];
  }

  // !FIND BY ID
  async findById(id: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
    return result.length ? result[0] : null;
  }
}
