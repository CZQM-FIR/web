import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const positions = sqliteTable("positions", {
  id: int().primaryKey({ autoIncrement: true }),
  callsign: text().notNull().unique(),
  frequency: text().notNull(),
  name: text().notNull(),
});

export default positions;
