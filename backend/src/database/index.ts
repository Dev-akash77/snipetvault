import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const createDatabase = (databaseUrl: string) => {
  try {
    const pool = new Pool({
      connectionString: databaseUrl,
      ssl: true,
    });
    console.log(`POSTGRE Connected`);
    return drizzle(pool, { schema });
  } catch (error) {
    console.log(`POSTGRES Connection Failed ${error}`);
  }
};
