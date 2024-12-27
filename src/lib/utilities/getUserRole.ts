import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const getUserRole = async (locals: App.Locals, cid: number) => {
  const { db } = locals;

  const user = await db.query.users.findFirst({
    where: eq(users.cid, cid),
    columns: {
      cid: true
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
  });

  if (!user) return 'Guest';

  if (user.flags.some((flag) => flag.flag.name === 'chief')) return 'FIR Chief';
  else if (user.flags.some((flag) => flag.flag.name === 'deputy')) return 'Deputy FIR Chief';
  else if (user.flags.some((flag) => flag.flag.name === 'chief-instructor'))
    return 'Chief Instructor';
  else if (user.flags.some((flag) => flag.flag.name === 'web')) return 'Webmaster';
  else if (user.flags.some((flag) => flag.flag.name === 'events')) return 'Events Coordinator';
  else if (user.flags.some((flag) => flag.flag.name === 'sector')) return 'Facility Engineer';
  else if (user.flags.some((flag) => flag.flag.name === 'instructor')) return 'Instructor';
  else if (user.flags.some((flag) => flag.flag.name === 'mentor')) return 'Mentor';
  else if (
    user.flags.some((flag) => flag.flag.name === 'visitor') &&
    user.flags.some((flag) => flag.flag.name === 'inactive')
  )
    return 'Inacvtive Visitor';
  else if (
    user.flags.some((flag) => flag.flag.name === 'controller') &&
    user.flags.some((flag) => flag.flag.name === 'inactive')
  )
    return 'Inacvtive Home Controller';
  else if (user.flags.some((flag) => flag.flag.name === 'visitor')) return 'Visitor';
  else if (user.flags.some((flag) => flag.flag.name === 'controller')) return 'Home Controller';
  else return 'Guest';
};
