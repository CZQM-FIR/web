import { drizzle } from 'drizzle-orm/d1';
import type { PageServerLoad } from './$types';
import * as schema from '$lib/db/schema';

export const load = (async ({ platform }) => {
  const db = drizzle(platform?.env.DB!, { schema });

  const tests = await db.query.test.findMany();

  return { tests };
}) satisfies PageServerLoad;
