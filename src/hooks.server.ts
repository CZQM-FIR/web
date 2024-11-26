import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';

let platform: App.Platform;

if (dev) {
  const { getPlatformProxy } = await import('wrangler');
  platform = await getPlatformProxy();
}

export const handle = (async ({ event, resolve }) => {
  if (dev && platform) {
    event.platform = {
      ...event.platform,
      ...platform
    };
  }

  event.locals.db = drizzle(event.platform?.env.DB as D1Database);

  return await resolve(event);
}) satisfies Handle;
