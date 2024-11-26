import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const ratings = sqliteTable("ratings", {
  id: int().primaryKey(),
  long: text().notNull(),
  short: text().notNull(),
});

export default ratings;
