import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema/transaction';

const sql = neon(
  'postgresql://Aqib-Rime:ya7cRAWz1xwt@ep-falling-mode-a16sw0rv.ap-southeast-1.aws.neon.tech/hono?sslmode=require',
);
export const db = drizzle(sql, { schema });
