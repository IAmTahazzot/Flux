import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

config({ path: '.env.local' });

const psql = neon(process.env.DATABASE_URL!);
const db = drizzle(psql);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migration complete');
  } catch (error) {
    console.log('Error during migration:', error);
    process.exit(1);
  }
};

main();