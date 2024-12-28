import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { users } from '$lib/db/schema';
import { getUserRole, getUserRoleByCID } from '$lib/utilities/getUserRole';

export const load = (async ({ locals }) => {
  const { db } = locals;

  const users = (await db.query.users.findMany({
    columns: {
      cid: true,
      name_full: true,
      rating: true
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
