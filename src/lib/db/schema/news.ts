import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from ".";
import { relations } from "drizzle-orm";

const news = sqliteTable("news", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  text: text().notNull(),
  date: int({ mode: "timestamp" }).notNull(),
  author: int().references(() => users.cid, { onDelete: "set null" }),
});

const newsRelations = relations(news, ({ one }) => ({
  author: one(users, {
    fields: [news.author],
    references: [users.cid],
  }),
}));

export default news;
