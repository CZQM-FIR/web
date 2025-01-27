import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const db = locals.db;

  const news = await db.query.news.findMany({
    with: {
      author: {
        columns: {
          cid: true,
          name_full: true
        }
      }
    }
  });

  return { news };
}) satisfies PageServerLoad;
