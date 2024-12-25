import { deleteSessionTokenCookie, invalidateSession } from '$lib/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
  if (event.locals.session) {
    invalidateSession(event.locals.session.id, event.locals);
  }

  if (event.cookies.get('session')) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/auth/logout'
      }
    });
  } else {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    });
  }
};
