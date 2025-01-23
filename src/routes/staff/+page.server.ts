import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { db } = locals;

  type StaffUser = {
    cid: number;
    name_full: string;
    bio: string | null;
    flags: {
      userId: number;
      flagId: number;
      flag: {
        name: string;
      };
    }[];
    role?: string;
  };

  const users = (await db.query.users.findMany({
    columns: {
      cid: true,
      name_full: true,
      bio: true
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
      }
    }
  })) as StaffUser[];

  const staff = users.filter((user) => user.flags.some((flag) => flag.flag.name === 'staff'));

  staff.map((staff) => {
    let roles = [];

    if (staff.flags.some((flag) => flag.flag.name === 'chief')) roles.push('FIR Chief');
    if (staff.flags.some((flag) => flag.flag.name === 'deputy')) roles.push('Deputy FIR Chief');
    if (staff.flags.some((flag) => flag.flag.name === 'chief-instructor'))
      roles.push('Chief Instructor');
    if (staff.flags.some((flag) => flag.flag.name === 'web')) roles.push('Webmaster');
    if (staff.flags.some((flag) => flag.flag.name === 'events')) roles.push('Events Coordinator');
    if (staff.flags.some((flag) => flag.flag.name === 'sector')) roles.push('Facility Engineer');

    staff.role = roles.join(' & ');
  });

  return {
    staff
  };
}) satisfies PageServerLoad;
