import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { users } from '$lib/czqm/db/schema';
import { getUserRole, getUserRoleByCID } from '$lib/czqm/utilities/getUserRole';
import { db } from '$lib/czqm/db';

export const load = (async () => {
  const users = (await db.query.users.findMany({
    columns: {
      cid: true,
      name_full: true,
      ratingID: true
    },
    with: {
      flags: {
        with: {
          flag: {
            columns: {
              name: true
            }
          }
        }
      },
      rating: true
    }
  })) as Array<{
    cid: number;
    name_full: string;
    rating: { id: number; long: string; short: string };
    flags: { userId: number; flagId: number; flag: { name: string } }[];
    role?: string;
  }>;

  const controllers = users.filter((controller) => {
    return controller.flags.some(
      (flag) => flag.flag.name === 'controller' || flag.flag.name === 'visitor'
    );
  });

  controllers.map(async (controller) => {
    controller.role = getUserRole(controller.flags);
  });

  return {
    controllers
  };
}) satisfies PageServerLoad;
