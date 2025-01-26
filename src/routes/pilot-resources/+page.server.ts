import { resources } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { db } = locals;

  const pilotResources = await db.query.resources.findMany({
    where: (resources, { eq, and, or }) =>
      and(or(eq(resources.type, 'pilot'), eq(resources.type, 'both')), eq(resources.public, 1)),
    columns: {
      public: false,
      type: false
    }
  });

  return { resources: pilotResources };
}) satisfies PageServerLoad;
