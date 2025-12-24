import { uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().notNull(),
  task: varchar('task', { length: 255 }).notNull().unique(),
  check: boolean('check').default(false),
  created_at: timestamp('created_at').defaultNow(),
});
