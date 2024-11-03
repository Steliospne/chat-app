'server only';

import { redirect } from 'next/navigation';
import { createNewUser, getUserByUsername } from '../_db/queries';
import { LoginFormSchema, SignupFormSchema } from '../lib/definitions';
import { createSession, deleteSession } from '../lib/session';
const bcrypt = require('bcryptjs');

const signup = async (state, formData) => {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConf: formData.get('passwordConf'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  bcrypt.hash(validatedFields.data.password, 10, async (error, hash) => {
    if (error) {
      throw error;
    }

    // Prepare user object
    const [, ...lastname] = validatedFields.data.name.split(' ');
    const newUser = {
      firstname: validatedFields.data.name.split(' ')[0],
      lastname: lastname.join(' '),
      email: validatedFields.data.email,
      username: validatedFields.data.email,
      password: hash,
    };

    // Query db to create new user
    const data = await createNewUser(newUser);
    const user = data[0];
    await createSession(user);
  });

  // Create session

  return validatedFields;
};

const login = async (state, formData) => {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  const user = await getUserByUsername(validatedFields?.data?.username);

  const match = await bcrypt.compare(
    validatedFields?.data?.password,
    user.password,
  );
  if (match) {
    await createSession(user.id);

    redirect('/');
  }
};

const logout = async (state) => {
  await deleteSession();
  redirect('/auth/login');
};

export { signup, login, logout };
