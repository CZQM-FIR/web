import { db } from '$lib/czqm/db';
import { users } from '$lib/czqm/db/schema';
import { getUserRole } from '$lib/czqm/utilities/getUserRole';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
  const { cid } = params;

  const userData = await db.query.users.findFirst({
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

  if (
    !userData ||
    !userData.flags.some((f) => [4, 5].includes(f.flag.id)) ||
    userData.cid !== Number(cid)
  ) {
    return error(404, {
      message: 'Controller not Found'
    });
  }

  const role = getUserRole(userData.flags);

  return {
    userData,
    role
  };
}) satisfies PageServerLoad;
