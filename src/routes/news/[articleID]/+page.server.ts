import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { news } from '$lib/db/schema';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
  const db = locals.db;
  const articleID = params.articleID;

  const article = await db.query.news.findFirst({
    where: eq(news.id, Number(articleID)),
    with: {
      author: {
        columns: {
          cid: true,
          name_full: true
        }
      }
    }
  });

  if (!article) {
    redirect(303, '/news');
  }

  return {
    article
  };
}) satisfies PageServerLoad;
