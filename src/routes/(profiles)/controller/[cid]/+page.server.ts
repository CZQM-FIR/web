import { db } from '$lib/czqm/db';
import { users } from '$lib/czqm/db/schema';
import { getUserRole } from '$lib/czqm/utilities/getUserRole';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
  const { cid } = params;

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.cid, Number(cid)),
    with: {
      flags: {
        with: {
          flag: true
        }
      },
      rating: true,
      roster: true,
      soloEndorsements: {
        with: {
          position: true
        }
      },
      sessions: {
        with: {
          position: true
        }
      }
    },
    columns: {
      cid: true,
      bio: true,
      name_first: true,
      name_last: true,
      name_full: true
    }
  });

  if (!user || !user.flags.some((f) => [4, 5].includes(f.flag.id))) {
    return {
      status: 404,
      error: new Error('User not found')
    };
  }

  const role = getUserRole(user.flags);

  return {
    user,
    role
  };
}) satisfies PageServerLoad;
