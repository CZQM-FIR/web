// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
  namespace App {
    interface Platform {
      env: {
        DB: D1Database;
      };
    }
    interface Locals {
      db: import('drizzle-orm/d1').DrizzleD1Database;
    }
  }
}

export {};
