import { events } from '$lib/db/schema';
import { desc, eq } from 'drizzle-orm';

export const getAllEvents = async (locals: App.Locals) => {
  const { db } = locals;

  const eventData = db.query.events.findMany({
    orderBy: [desc(events.start)]
  });

  return eventData;
};

export const getEventById = async (locals: App.Locals, id: number) => {
  const { db } = locals;

  const event = db.query.events.findFirst({
    where: eq(events.id, id)
  });

  return event;
};
