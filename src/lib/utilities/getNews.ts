import { news } from '$lib/db/schema';
import { desc, eq } from 'drizzle-orm';

export const getAllArticles = async (locals: App.Locals) => {
  const { db } = locals;

  const articles = db.query.news.findMany({
    orderBy: [desc(news.date)],
    with: {
      author: {
        columns: {
          email: false
        }
      }
    }
  });

  return articles;
};

export const getArticleById = async (locals: App.Locals, id: number) => {
  const { db } = locals;

  const article = db.query.news.findFirst({
    where: eq(news.id, id),
    with: {
      author: {
        columns: {
          email: false
        }
      }
    }
  });

  return article;
};
