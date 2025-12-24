import { Inject, Injectable } from '@nestjs/common';
import { tasks } from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(@Inject('DB') private readonly db: any) {}

  async createUser(data: any) {
    const newUser = await this.db
      .insert(tasks)
      .values({
        task: data.name,
      })
      .returning();

    return newUser[0];
  }

  async getUser() {
    return await this.db.select().from(tasks);
  }

  async getUserById(id: string) {
    return await this.db.select().from(tasks).where(eq(tasks.id, id));
  }

  async deletePost(id: string) {
    const user = await this.db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    return { user, message: `${id} deleted` };
  }
}
