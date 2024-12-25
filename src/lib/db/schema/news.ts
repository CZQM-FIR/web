import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from '.';
import { relations, type InferSelectModel } from 'drizzle-orm';

export const news = sqliteTable('news', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  text: text().notNull(),
  date: int({ mode: 'timestamp' }).notNull(),
  author: int().references(() => users.cid, { onDelete: 'set null' })
});

export const newsRelations = relations(news, ({ one }) => ({
  author: one(users, {
    fields: [news.author],
    references: [users.cid]
  })
}));

export type Article = InferSelectModel<typeof news>;
