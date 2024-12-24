import { int } from 'drizzle-orm/sqlite-core';
import { sqliteTable } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import type { InferSelectModel } from 'drizzle-orm';

export const authSessions = sqliteTable('auth_sessions', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int('user_id')
    .notNull()
    .references(() => users.cid),
  expiresAt: int('expires_at', {
    mode: 'timestamp'
  }).notNull()
});

export type AuthSession = InferSelectModel<typeof authSessions>;