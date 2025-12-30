import {
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { injection_token } from '../../common/constants/constant';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { AppException } from '../../common/exceptions/app.exception';
import { ErrorCode } from '../../common/constants/error-code';
import { tasks } from '../../database/schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(injection_token.DB_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createUser(data: CreateTaskDto) {
    const existTask = await this.db
      .select()
      .from(tasks)
      .where(eq(tasks.task, data.name));

    if (existTask[0]) {
      throw new AppException(
        'Conflict Task',
        HttpStatus.CONFLICT,
        ErrorCode.CONFLICT,
        ['Task Allready Exist'],
      );
    }

    const newUser = await this.db
      .insert(tasks)
      .values({
        task: data.name,
        check: data.check,
      })
      .returning();

    return newUser[0];
  }

  async getUser() {
    return await this.db.select().from(tasks);
  }

  async getUserById(id: string) {
    const task = await this.db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id))
      .limit(1);

    if (task.length === 0) {
      throw new AppException(
        'Not Found',
        HttpStatus.NOT_FOUND,
        ErrorCode.NOT_FOUND,
        ['Task Not Found'],
      );
    }

    return task[0];
  }

  async deletePost(id: string) {
    await this.getUserById(id);

    const task = await this.db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();

    return { task, message: `${id} deleted` };
  }
}
