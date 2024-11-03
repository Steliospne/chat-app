import { verifySession } from '../lib/session';
import { getUserById } from '../_db/queries';
import { cache } from 'react';

export const getUserData = cache(async () => {
  const session = await verifySession();

  const { rows } = await getUserById(session.userId);

  const user = rows[0];

  return user;
});
