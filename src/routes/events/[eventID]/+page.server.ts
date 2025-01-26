import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { events } from '$lib/db/schema';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
  const db = locals.db;
  const eventID = params.eventID;

  const event = await db.query.events.findFirst({
    where: eq(events.id, Number(eventID))
  });

  if (!event) {
    redirect(303, '/events');
  }

  return {
    event
  };
}) satisfies PageServerLoad;
