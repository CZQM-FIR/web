import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const db = locals.db;

  const events = await db.query.events.findMany();

  const upcomingEvents = events.filter((event) => new Date(event.end) > new Date());
  const pastEvents = events.filter((event) => new Date(event.end) <= new Date());

  return {
    upcomingEvents,
    pastEvents
  };
}) satisfies PageServerLoad;
