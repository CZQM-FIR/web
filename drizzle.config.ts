import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

let dbConfig;

if (process.env.ENVIRONMENT !== 'production') {
  console.log('local');
  dbConfig = {
    schema: './src/lib/db/schema/index.ts',
    out: './drizzle',
    dialect: 'sqlite',
    dbCredentials: {
      url: './.wrangler/state/v3/d1/miniflare-D1DatabaseObject/51c0e20ab3fa1808da86eadfe2026c58dc4242a4f7547eb68224b6660b4a999e.sqlite'
    }
  };
} else {
  console.log('production');
  dbConfig = {
    schema: './src/lib/db/schema/index.ts',
    out: './drizzle',
    dialect: 'sqlite',
    driver: 'd1-http',
    dbCredentials: {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
      token: process.env.CLOUDFLARE_D1_TOKEN!
    }
  };
}

export default defineConfig(dbConfig);
