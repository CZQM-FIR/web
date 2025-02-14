import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { user } = locals;

  if (!user) {
    redirect(303, '/auth?redirect=/my');
  }

  return {};
}) satisfies LayoutServerLoad;
