import { pgEnum } from 'drizzle-orm/pg-core';
import { uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().notNull(),
  task: varchar('task', { length: 255 }).notNull().unique(),
  check: boolean('check').default(false),
  created_at: timestamp('created_at').defaultNow(),
});

 const userRoleEnum = pgEnum('user_role', ['user', 'admin']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password').notNull(),
  role: userRoleEnum('role').default('user').notNull(),
});
