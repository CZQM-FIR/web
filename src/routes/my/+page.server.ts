import { db } from '$lib/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import * as schema from '$lib/db/schema';

export const load = (async ({ locals }) => {
  const user = await db.query.users.findFirst({
    where: eq(schema.users.cid, locals.user!.cid),
    with: {
      flags: true,
      rating: true,
      sessions: true
    }
  });

  return { user };
}) satisfies PageServerLoad;
