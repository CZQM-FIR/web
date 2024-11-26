import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const events = sqliteTable("events", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
  start: int({ mode: "timestamp" }).notNull(),
  end: int({ mode: "timestamp" }).notNull(),
});

export default events;
