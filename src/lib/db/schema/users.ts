import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { news, ratings, sessions, usersToFlags } from '.';

export const users = sqliteTable('users', {
  cid: int().primaryKey(),
  name_first: text().notNull(),
  name_last: text().notNull(),
  name_full: text().notNull(),
  email: text().notNull().unique(),
  rating: int()
    .notNull()
    .references(() => ratings.id),
  division: text(),
  region: text(),
  subdivision: text(),
  bio: text()
});

export const usersRelations = relations(users, ({ one, many }) => ({
  rating: one(ratings, {
    fields: [users.rating],
    references: [ratings.id]
  }),
  flags: many(usersToFlags),
  // articles: many(news),
  sessions: many(sessions)
}));

export type User = InferSelectModel<typeof users>;
