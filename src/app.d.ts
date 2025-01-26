// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from '$lib/db/schema';

declare global {
  namespace App {
    interface Platform {
      env: {
        DB: D1Database;
        bucket: R2Bucket;
      };
    }
    interface Locals {
      db: DrizzleD1Database<typeof schema>;
      user: schema.User | null;
      session: schema.AuthSession | null;
      bucket: R2Bucket;
    }
  }
}

export {};
